import { Injectable } from "@nestjs/common";
import { CommunicationInterface } from "./interface/communication.interface";
import twilio from "twilio";
import { CustomException } from "src/domain/entities/error/custom-exception";
import { ERROR_NAME } from "src/infrastructure/enums/error-name.enum";
const { TWILLIO_ACCOUNT_SID, TWILLIO_AUTH_TOKEN, TWILLIO_PHONE_NUMBER } =
  process.env;

@Injectable()
export class TwillioProvider implements CommunicationInterface {
  protected accountSid = TWILLIO_ACCOUNT_SID;
  protected authToken = TWILLIO_AUTH_TOKEN;
  protected phoneNumber = TWILLIO_PHONE_NUMBER;
  private client = twilio(this.accountSid, this.authToken);

  async send(options: {
    to?: string;
    from?: string;
    subject?: string;
    text?: string;
    html?: string;
  }): Promise<void> {
    try {
      await this.client.messages.create({
        body: options.text,
        to: options.to,
        from: this.phoneNumber,
      });
    } catch (error) {
      throw new CustomException(ERROR_NAME.INTERNAL_SYSTEM_ERROR);
    }
  }
}
