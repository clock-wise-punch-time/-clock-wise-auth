/**
 * Interface que define um contrato para serviços de comunicação.
 *
 * @remarks
 * Este contrato define métodos para enviar mensagens de e-mail ou outras formas de comunicação.
 *
 * @public
 */
export interface CommunicationInterface {
  /**
   * Método para enviar uma mensagem de comunicação.
   *
   * @param options - Opções para a mensagem, incluindo destinatário, remetente, assunto, texto e HTML.
   * @returns Uma Promise que é resolvida quando a mensagem é enviada com sucesso.
   *
   * @throws {Error} Se houver um erro ao enviar a mensagem.
   *
   * @public
   */
  send(options: {
    to?: string;
    from?: string;
    subject?: string;
    text?: string;
    html?: string;
  }): Promise<void>;
}
