import { Inject, Injectable } from '@nestjs/common';
import { ResetEmailDTO } from 'src/application/dtos/reset-email.dto';
import { CodeService } from 'src/application/services/code.service';
import { UserService } from 'src/application/services/user.service';
import { DateInterface } from 'src/core/utils/interfaces/date.util';
import { CustomException } from 'src/domain/entities/error/custom-exception';
import { ERROR_NAME } from 'src/infrastructure/enums/error-name.enum';

@Injectable()
export class ResetEmailUseCase {
  constructor(
    private readonly user: UserService,
    private readonly code: CodeService,
    @Inject('Date')
    private readonly date: DateInterface,
  ) {}

  async execute(data: ResetEmailDTO) {
    try {
      const { oldEmail, newEmail, token } = data;

      const user = await this.isRegisteredEmail(oldEmail);
      const code = await this.tokenIsExpirated(user.id, token);

      await this.validTokenCode(code.id);
      await this.updateUserEmail(user.id, newEmail);
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
      type: 'EMAIL_RESET',
      code: token,
    });
    const isExpired = this.date.isExpired(code.created_at, 2, 'hours');
    if (isExpired) {
      throw new CustomException(ERROR_NAME.CODE_VALIDATION_FAILED);
    }
    return code;
  }

  async validTokenCode(codeId: string) {
    await this.code.update(codeId, { status: true });
  }

  async updateUserEmail(userId: string, email: string) {
    await this.user.update(userId, { email });
  }
}
