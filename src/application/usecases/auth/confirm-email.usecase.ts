import { Inject, Injectable } from "@nestjs/common";
import { ConfirmEmailDTO } from "src/application/dtos/confirm-email.dto";
import { CodeService } from "src/application/services/code.service";
import { UserService } from "src/application/services/user.service";
import { DateInterface } from "src/core/utils/interfaces/date.util";
import { CustomException } from "src/domain/entities/error/custom-exception";
import { ERROR_NAME } from "src/infrastructure/enums/error-name.enum";

@Injectable()
export class ConfirmEmailUseCase {
  constructor(
    private readonly user: UserService,
    private readonly code: CodeService,
    @Inject("Date")
    private readonly date: DateInterface,
  ) {}

  async execute(data: ConfirmEmailDTO) {
    try {
      const { email, token } = data;

      const user = await this.isRegisteredEmail(email);
      const code = await this.tokenIsExpirated(user.id, token);

      await this.validTokenCode(code.id);
      await this.updateUser(user.id);
    } catch (error) {
      throw error;
    }
  }

  async isRegisteredEmail(email: string) {
    const user = await this.user.findOne({ email });
    if (!user) {
      throw new CustomException(ERROR_NAME.USER_NOT_FOUND);
    }
    return user;
  }

  async tokenIsExpirated(userId: string, token: string) {
    const code = await this.code.findOne({
      user_id: userId,
      type: "EMAIL_VERIFY",
      code: token,
    });
    const isExpired = this.date.isExpired(code.created_at, 2, "hours");
    if (isExpired) {
      throw new CustomException(ERROR_NAME.CODE_VALIDATION_FAILED);
    }
    return code;
  }

  async validTokenCode(codeId: string) {
    await this.code.update(codeId, { status: true });
  }

  async updateUser(userId: string) {
    await this.user.update(userId, { verify_email: true });
  }
}
