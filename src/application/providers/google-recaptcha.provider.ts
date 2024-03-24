import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { CustomException } from "src/domain/entities/error/custom-exception";
import { ERROR_NAME } from "src/infrastructure/enums/error-name.enum";

export class GoogleRecaptcha {
  protected secretKey = process.env.GOOGLE_RECAPTCHA_SECRET_KEY;

  constructor(private readonly httpService: HttpService) {}

  async verify(token: string) {
    try {
      await this.httpService?.axiosRef?.post<AxiosResponse<any>>(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          secret: this.secretKey,
          response: token,
        },
      );
      return true;
    } catch (error) {
      console.log(error);
      throw new CustomException(ERROR_NAME.RECAPTCHA_FAILED);
    }
  }
}
