import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RefreshTokenMapper } from "src/application/mappers/refresh-token.mapper";
import { RefreshTokenService } from "src/application/services/refresh-token.service";
import { UserService } from "src/application/services/user.service";
import { RequestUser } from "src/core/types/request.types";
import { GenerateCodeInterface } from "src/core/utils/interfaces/generate-code.interface";
import { RSAInterface } from "src/core/utils/interfaces/rsa.interface";
import { CustomException } from "src/domain/entities/error/custom-exception";
import { ERROR_NAME } from "src/infrastructure/enums/error-name.enum";

type Data = {
  refreshToken: string;
} & RequestUser;

@Injectable()
export class RefreshTokenUseCase {
  protected jwtSecret = process.env.JWT_SECRET_KEY;

  constructor(
    private readonly user: UserService,
    @Inject("RSA")
    private readonly rsa: RSAInterface,
    private readonly refreshToken: RefreshTokenService,
    private readonly jwt: JwtService,
    @Inject("GenerateCode")
    private readonly generateCode: GenerateCodeInterface,
  ) {}

  async execute(data: Data) {
    try {
      const {
        refreshToken,
        user: { user_id },
      } = data;
      await this.checkOpacToken(user_id, refreshToken);

      const userRevalidated = await this.reValidateUser(user_id);

      const newToken = await this.genereNewTokens(
        userRevalidated.id,
        userRevalidated.role,
      );

      return new RefreshTokenMapper({
        accessToken: newToken.accessToken,
        refreshToken: newToken.refreshToken,
        firstName: userRevalidated.name,
        lastName: userRevalidated.lastname,
      });
    } catch (error) {
      throw error;
    }
  }

  async checkOpacToken(userId: string, refreshToken: string) {
    const isExists = await this.refreshToken.get(userId);

    if (isExists !== refreshToken) {
      throw new CustomException(ERROR_NAME.AUTHORIZATION_ERROR);
    }
  }

  async reValidateUser(userId: string) {
    const user = await this.user.findOne({ id: userId });
    if (!user) {
      throw new CustomException(ERROR_NAME.USER_NOT_FOUND);
    }
    return user;
  }

  async genereNewTokens(userId: string, role: string) {
    const userInfoEncrypt = this.rsa.encrypt({ user_id: userId, role });
    const accessToken = this.jwt.sign(userInfoEncrypt, {
      secret: this.jwtSecret,
    });

    const refreshToken = this.generateCode.opac();
    const ttl = 15 * 60 * 1000;
    await this.refreshToken.store(userId, refreshToken, ttl);

    return {
      accessToken,
      refreshToken,
    };
  }
}
