import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { CommunicationInterface } from './interface/communication.interface';

/**
 * Provedor de comunicação utilizando o serviço SMTP para envio de e-mails.
 * Implementa o contrato de comunicação para envio de mensagens.
 */
@Injectable()
export class SMTPProvider implements CommunicationInterface {
  protected logger = new Logger(SMTPProvider.name);
  /**
   * Construtor da classe SMTPProvider.
   * @param mailerService - Instância do serviço Mailer para envio de e-mails.
   */
  constructor(private readonly mailerService: MailerService) {}

  /**
   * Envia um e-mail utilizando o serviço SMTP.
   * @param data - Dados necessários para o envio do e-mail.
   * @throws {InternalServerErrorException} - Lançado se houver falha no envio do e-mail.
   */
  async send(data: {
    to?: string;
    from?: string;
    subject?: string;
    text?: string;
    html?: string;
  }): Promise<void> {
    try {
      await this.mailerService.sendMail(data);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
