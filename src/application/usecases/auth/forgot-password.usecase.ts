import { Inject, Injectable, Logger } from '@nestjs/common';
import { ForgotPasswordDTO } from 'src/application/dtos/forgot-password.dto';
import { CommunicationInterface } from 'src/application/providers/interface/communication.interface';
import { RecaptchaInterface } from 'src/application/providers/interface/recaptcha.interface';
import { CodeService } from 'src/application/services/code.service';
import { UserService } from 'src/application/services/user.service';
import { requestResetPasswordTemplate } from 'src/application/templates/request-reset-password-email.template';
import { GenerateCodeInterface } from 'src/core/utils/interfaces/generate-code.interface';
import { Code } from 'src/domain/entities/code';
import { CustomException } from 'src/domain/entities/error/custom-exception';
import { User } from 'src/domain/types/user';
import { ERROR_NAME } from 'src/infrastructure/enums/error-name.enum';

@Injectable()
export class ForgotPasswordUseCase {
  protected logger = new Logger(ForgotPasswordUseCase.name);
  protected baseUrl = process.env.BASE_URL;
  protected enviromnet = process.env.NODE_ENV;

  constructor(
    private readonly user: UserService,
    @Inject('SMTP')
    private readonly communication: CommunicationInterface,
    @Inject('Recaptcha')
    private readonly recaptcha: RecaptchaInterface,
    @Inject('GenerateCode')
    private readonly generateCode: GenerateCodeInterface,
    private readonly code: CodeService,
  ) {}

  async execute(data: ForgotPasswordDTO) {
    try {
      const { recaptchaToken, identifier } = data;

      await this.checkRecaptchaToken(recaptchaToken);

      const user = await this.searcherForUser(identifier);

      await this.sendLinkPasswordResetInEmail(user.id, user.name, user.email);
    } catch (error) {
      throw error;
    }
  }

  async checkRecaptchaToken(recaptchaToken: string) {
    if (this.enviromnet === 'production') {
      await this.recaptcha.verify(recaptchaToken);
    }
  }

  async searcherForUser(identifier: string) {
    const verifyUsername = this.user.findOne({
      username: identifier,
    }) as Promise<User | any>;
    const verifyEmail = this.user.findOne({
      email: identifier,
    }) as Promise<User | any>;
    const verifyCPF = this.user.findOne({
      cpf: identifier,
    }) as Promise<User | any>;
    const verifyRegistration = this.user.findOne({
      registration: identifier,
    }) as Promise<User | any>;

    const [userByUsername, userByRegistration, userByEmail, userByCPF] =
      await Promise.all([
        verifyUsername,
        verifyRegistration,
        verifyEmail,
        verifyCPF,
      ]);

    const user = (userByUsername ||
      userByRegistration ||
      userByEmail ||
      userByCPF) as User;

    if (!user) {
      throw new CustomException(ERROR_NAME.USER_NOT_FOUND);
    }

    return user;
  }

  async sendLinkPasswordResetInEmail(
    userId: string,
    name: string,
    email: string,
  ) {
    const token = this.generateCode.opac();

    const confirmResetPasswordRegister = new Code({
      user_id: userId,
      type: 'PASSWORD_RESET',
      code: token,
    });

    await this.code.create(confirmResetPasswordRegister);
    this.logger.debug(`VALIDATE RESET PASSWORD -> CODE ${token} -> ${userId}`);

    const link = `${this.baseUrl}/reset/${email}/${token}/password`;
    await this.communication.send({
      to: email,
      from: process.env.MAIL_FROM,
      subject: '⌚ Solicitação de Redefinição de Senha - Clock-Wise',
      html: requestResetPasswordTemplate(name, link),
    });
  }
}
