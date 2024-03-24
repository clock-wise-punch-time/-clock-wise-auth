/**
 * Interface que define um contrato para geração de códigos.
 *
 * @remarks
 * Este contrato inclui métodos para gerar códigos utilizando diferentes estratégias.
 *
 * @public
 */
export interface GenerateCodeInterface {
  /**
   * Gera um código de seis caracteres.
   *
   * @returns Uma string representando um código de seis caracteres gerado.
   *
   * @public
   */
  six(): string;

  /**
   * Gera um código opaco.
   *
   * @returns Uma string representando um código opaco gerado.
   *
   * @public
   */
  opac(): string;
}
