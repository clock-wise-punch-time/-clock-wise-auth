import { Inject, Injectable, Logger } from '@nestjs/common';
import { RegisterDTO } from 'src/application/dtos/register.dto';
import { CommunicationInterface } from 'src/application/providers/interface/communication.interface';
import { FingerprintInterface } from 'src/application/providers/interface/fingerprint.interface';
import { RecaptchaInterface } from 'src/application/providers/interface/recaptcha.interface';
import { IpBlocklistService } from 'src/application/services/IpBlocklist.service';
import { CodeService } from 'src/application/services/code.service';
import { DeviceService } from 'src/application/services/device.service';
import { GuidelineAccepetedService } from 'src/application/services/guideline-accepted.service';
import { GuidelineService } from 'src/application/services/guideline.service';
import { UserService } from 'src/application/services/user.service';
import { DateInterface } from 'src/core/utils/interfaces/date.util';
import { GenerateCodeInterface } from 'src/core/utils/interfaces/generate-code.interface';
import { HasherInterface } from 'src/core/utils/interfaces/hasher.interface';
import { RegistrationInterface } from 'src/core/utils/interfaces/registration.interface';
import { Code } from 'src/domain/entities/code';
import { Device } from 'src/domain/entities/device';
import { CustomException } from 'src/domain/entities/error/custom-exception';
import { User } from 'src/domain/entities/user';
import { ERROR_NAME } from 'src/infrastructure/enums/error-name.enum';
import { welcomeConfirmEmailTemplate } from '../../templates/welcome-confirme-email.template';

@Injectable()
export class RegisterUseCase {
  protected logger = new Logger(RegisterUseCase.name);
  protected enviromnet = process.env.NODE_ENV;
  protected baseUrl = process.env.BASE_URL;

  constructor(
    private user: UserService,
    private readonly device: DeviceService,
    private readonly guidelines: GuidelineService,
    private readonly guidelinesAccepeted: GuidelineAccepetedService,
    private readonly code: CodeService,
    @Inject('Date')
    private readonly date: DateInterface,
    @Inject('Hasher')
    private readonly hasher: HasherInterface,
    @Inject('GenerateCode')
    private readonly generateCode: GenerateCodeInterface,
    @Inject('Registration')
    private readonly registration: RegistrationInterface,
    @Inject('SMTP')
    private readonly communication: CommunicationInterface,
    @Inject('Fingerprint')
    private readonly fingerprint: FingerprintInterface,
    private readonly ipBlockList: IpBlocklistService,
    @Inject('Recaptcha')
    private readonly recaptcha: RecaptchaInterface,
  ) {}

  async execute(data: RegisterDTO) {
    this.logger.debug('PAYLOAD', JSON.stringify(data));
    try {
      const {
        name,
        lastname,
        phone,
        password,
        username,
        cpf,
        email,
        birthdate,
        termsAccepted,
        fingerprintId,
        recaptchaToken,
      } = data;

      await this.checkRecaptchaToken(recaptchaToken);
      await this.acceptTheTerms(termsAccepted);
      await this.userAlreadyExists(username, cpf, email);

      const requestDevice = await this.identifyDevice(fingerprintId);

      const user = await this.createUser(
        username,
        name,
        lastname,
        cpf,
        email,
        phone,
        birthdate,
        password,
      );

      const device = await this.createDevice(requestDevice, user?.id);

      await this.agreeWithTheTerms(user?.id, device?.id);

      await this.welcomeAndConfirmEmail(user?.id, name, email);
    } catch (error) {
      throw error;
    }
  }

  async checkRecaptchaToken(recaptchaToken: string) {
    if (this.enviromnet === 'production') {
      await this.recaptcha.verify(recaptchaToken);
    }
  }

  async acceptTheTerms(termsAccepted: boolean) {
    if (!termsAccepted) {
      this.logger.log('NOT ACCEPT TERMS');
      throw new CustomException(ERROR_NAME.REFUSED_GUIDELINE);
    }
    this.logger.log('ACCEPT TERMS');
  }

  createRegistration(cpf: string, birthdate: Date) {
    const getDate = this.date.toFormat(birthdate, 'yyyy-mm-dd');
    const birthDateString = String(getDate);
    return this.registration.code(cpf, birthDateString);
  }

  async createUser(
    username: string,
    name: string,
    lastname: string,
    cpf: string,
    email: string,
    phone: string,
    birthdate: Date,
    password: string,
  ) {
    const registrationId = this.createRegistration(cpf, birthdate);
    const encryptPassword = this.hasher.encrypt(password);
    const user = new User({
      username,
      name,
      lastname,
      cpf,
      email,
      registration: registrationId,
      phone,
      birthdate: birthdate,
      password: encryptPassword,
      role: 'USER',
    });
    return await this.user.create(user);
  }

  async identifyDevice(fingerprintId: string) {
    const verifyDeviceInBlockList =
      await this.ipBlockList.getFingerprint(fingerprintId);
    if (verifyDeviceInBlockList) {
      throw new CustomException(ERROR_NAME.NETWORK_BLOCK_TEMPORARILY);
    }

    const device = await this.fingerprint.capture(fingerprintId);
    const verifyIpInBlockList = await this.ipBlockList.getIpAddress(
      device.address,
    );

    if (verifyIpInBlockList) {
      throw new CustomException(ERROR_NAME.NETWORK_BLOCK_TEMPORARILY);
    }

    if (device.bot) {
      await this.ipBlockList.store(
        device.address,
        fingerprintId,
        15 * 60 * 1000,
      );
      throw new CustomException(ERROR_NAME.NETWORK_BLOCK_TEMPORARILY);
    }

    return device;
  }

  async userAlreadyExists(username: string, cpf: string, email: string) {
    const verifyUsername = this.user.findOne({
      username,
    }) as Promise<User | any>;
    const verifyCPF = this.user.findOne({
      cpf,
    }) as Promise<User | any>;
    const verifyEmail = this.user.findOne({
      email,
    }) as Promise<User | any>;

    const [userByUsername, userByCPF, userByEmail] = await Promise.all([
      verifyUsername,
      verifyCPF,
      verifyEmail,
    ]);

    if (userByUsername) {
      throw new CustomException(ERROR_NAME.USERNAME_ALREADY_EXISTS);
    }

    if (userByCPF) {
      throw new CustomException(ERROR_NAME.CPF_ALREADY_EXISTS);
    }

    if (userByEmail) {
      throw new CustomException(ERROR_NAME.EMAIL_ALREADY_EXISTS);
    }
  }

  async verfiyFingerprint(fingerprintId: string) {
    const device = await this.device.findOne({ fingerprint_id: fingerprintId });
    if (device) {
      throw new CustomException(ERROR_NAME.FINGERPRINT_VERIFICATION_FAILED);
    }
  }

  async createDevice(device: Partial<Device>, userId: string) {
    if (this.enviromnet === 'production') {
      const newDevice = new Device({
        user_id: userId,
        ...device,
      });
      return await this.device?.create(newDevice);
    }
    return null;
  }

  async agreeWithTheTerms(userId: string, deviceId: string) {
    if (this.enviromnet === 'production') {
      const latestGuidelines = await this.guidelines.findAllLatestVersion();
      const acceptAllGuidelines = latestGuidelines.flatMap(({ id }) => {
        return {
          guideline_id: id,
          user_id: userId,
          device_id: deviceId,
          status: true,
        };
      });
      await this.guidelinesAccepeted.createMany(acceptAllGuidelines);
    }
  }

  async welcomeAndConfirmEmail(userId: string, name: string, email: string) {
    const token = this.generateCode.opac();

    const confirmEmailCodeCreatorRegister = new Code({
      user_id: userId,
      type: 'EMAIL_VERIFY',
      code: token,
    });

    await this.code.create(confirmEmailCodeCreatorRegister);
    this.logger.debug(`VALIDATE EMAIL -> CODE ${token} -> ${userId}`);

    const link = `${this.baseUrl}/confirm/${email}/${token}/email`;
    await this.communication.send({
      to: email,
      from: process.env.MAIL_FROM,
      subject: '⌚ Boas-Vindas à Clock-Wise: Confirme seu E-mail para Começar!',
      html: welcomeConfirmEmailTemplate(name, link),
    });
  }
}
