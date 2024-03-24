import { Inject, Injectable, Logger } from '@nestjs/common';
import { CommunicationInterface } from 'src/application/providers/interface/communication.interface';
import { CodeService } from 'src/application/services/code.service';
import { UserService } from 'src/application/services/user.service';
import { requestResetEmailTemplate } from 'src/application/templates/request-reset-email.template';
import { RequestUser } from 'src/core/types/request.types';
import { GenerateCodeInterface } from 'src/core/utils/interfaces/generate-code.interface';
import { Code } from 'src/domain/entities/code';
import { CustomException } from 'src/domain/entities/error/custom-exception';
import { ERROR_NAME } from 'src/infrastructure/enums/error-name.enum';

@Injectable()
export class RequestResetEmailUseCase {
  protected logger = new Logger(RequestResetEmailUseCase.name);
  protected baseUrl = process.env.BASE_URL;

  constructor(
    private readonly user: UserService,
    private readonly code: CodeService,
    @Inject('SMTP')
    private readonly communication: CommunicationInterface,
    @Inject('GenerateCode')
    private readonly generateCode: GenerateCodeInterface,
  ) {}

  async execute(data: RequestUser) {
    try {
      const { user_id } = data['user'];
      const user = await this.getEmail(user_id);
      await this.sendMailForResetEmail(user.id, user.name, user.email);
    } catch (error) {
      throw error;
    }
  }

  async getEmail(userId: string) {
    const user = await this.user.findOne({ id: userId });
    if (!user) {
      throw new CustomException(ERROR_NAME.USER_NOT_FOUND);
    }
    return user;
  }

  async sendMailForResetEmail(userId: string, name: string, email: string) {
    const token = this.generateCode.opac();

    const confirmEmailCodeCreatorRegister = new Code({
      user_id: userId,
      type: 'EMAIL_RESET',
      code: token,
    });

    await this.code.create(confirmEmailCodeCreatorRegister);
    this.logger.debug(`VALIDATE RESET EMAIL -> CODE ${token} -> ${userId}`);

    const link = `${this.baseUrl}/confirm/${email}/${token}/email`;
    await this.communication.send({
      to: email,
      from: process.env.MAIL_FROM,
      subject: '⌚ Solicitação de Alteração de E-mail - Clock-Wise',
      html: requestResetEmailTemplate(name, link),
    });
  }
}
