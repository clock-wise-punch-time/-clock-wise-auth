import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { config } from "dotenv";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWTDecryptPayload } from "../types/request.types";
import { RSAInterface } from "../utils/interfaces/rsa.interface";
config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject("RSA")
    private readonly rsa: RSAInterface,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET_KEY}`,
    });
  }

  async validate(data: string): Promise<JWTDecryptPayload> {
    const decryptData = this.rsa.decrypt(data);
    return decryptData as unknown as JWTDecryptPayload;
  }
}
