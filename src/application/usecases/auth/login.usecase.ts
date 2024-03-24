import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from 'src/application/dtos/login.dto';
import { LogginMapper } from 'src/application/mappers/login.mapper';
import { RecaptchaInterface } from 'src/application/providers/interface/recaptcha.interface';
import { RefreshTokenService } from 'src/application/services/refresh-token.service';
import { UserService } from 'src/application/services/user.service';
import { GenerateCodeInterface } from 'src/core/utils/interfaces/generate-code.interface';
import { HasherInterface } from 'src/core/utils/interfaces/hasher.interface';
import { RSAInterface } from 'src/core/utils/interfaces/rsa.interface';
import { CustomException } from 'src/domain/entities/error/custom-exception';
import { User } from 'src/domain/types/user';
import { ERROR_NAME } from 'src/infrastructure/enums/error-name.enum';

@Injectable()
export class LoginUseCase {
  protected enviromnet = process.env.NODE_ENV;
  protected logger = new Logger(LoginUseCase.name);
  protected jwtSecret = process.env.JWT_SECRET_KEY;

  constructor(
    private readonly user: UserService,
    @Inject('Hasher')
    private readonly hasher: HasherInterface,
    @Inject('GenerateCode')
    private readonly generateCode: GenerateCodeInterface,
    @Inject('RSA')
    private readonly rsa: RSAInterface,
    private readonly refreshToken: RefreshTokenService,
    private readonly jwt: JwtService,
    @Inject('Recaptcha')
    private readonly recaptcha: RecaptchaInterface,
  ) {}

  async execute(data: Partial<LoginDTO>) {
    try {
      const { identifier, recaptchaToken, password } = data;

      await this.checkRecaptchaToken(recaptchaToken);
      const user = await this.userAlreadyExists(identifier);
      this.checkPassword(password, user.password);

      const refreshToken = await this.createRefreshToken(user.id);
      const accessToken = this.createAccessToken(user);

      return new LogginMapper({
        firstName: user.name,
        lastName: user.lastname,
        refreshToken,
        accessToken,
      });
    } catch (error) {
      throw error;
    }
  }

  async checkRecaptchaToken(recaptchaToken: string) {
    if (this.enviromnet === 'production') {
      await this.recaptcha.verify(recaptchaToken);
    }
  }

  async userAlreadyExists(identifier: string) {
    const verifyUsername = this.user.findOne({
      username: identifier,
    }) as Promise<User | any>;
    const verifyRegistration = this.user.findOne({
      registration: identifier,
    }) as Promise<User | any>;

    const [userByUsername, userByRegistration] = await Promise.all([
      verifyUsername,
      verifyRegistration,
    ]);

    this.logger.debug('VERIFY USERNAME', userByUsername);
    this.logger.debug('VERIFY REGISTRATION', userByUsername);

    const user = (userByUsername || userByRegistration) as User;

    if (!user) {
      throw new CustomException(ERROR_NAME.USER_NOT_FOUND);
    }

    return user;
  }

  checkPassword(plainTextPassword: string, cypherPassword: string) {
    const verify = this.hasher.compare(plainTextPassword, cypherPassword);
    if (!verify) {
      throw new CustomException(ERROR_NAME.USER_INCORRECT);
    }
  }

  async createRefreshToken(userId: string) {
    const refreshToken = this.generateCode.opac();
    const ttl = 15 * 60 * 1000;
    await this.refreshToken.store(userId, refreshToken, ttl);
    return refreshToken;
  }

  createAccessToken(user: User) {
    const { id, role } = user;
    const userInfoEncrypt = this.rsa.encrypt({ user_id: id, role });
    return this.jwt.sign(userInfoEncrypt, { secret: this.jwtSecret });
  }
}
