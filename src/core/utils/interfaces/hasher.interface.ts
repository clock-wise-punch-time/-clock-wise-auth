/**
 * Interface que define um contrato para serviços de hashing.
 *
 * @remarks
 * Este contrato inclui métodos para criptografar texto e comparar hashes.
 *
 * @public
 */
export interface HasherInterface {
  /**
   * Criptografa um texto.
   *
   * @param text - O texto a ser criptografado.
   * @returns Uma string representando o hash criptografado.
   *
   * @throws {Error} Se houver um erro durante o processo de criptografia.
   *
   * @public
   */
  encrypt(text: string): string;

  /**
   * Compara dois hashes.
   *
   * @param hash - O hash original.
   * @param compare_hash - O hash a ser comparado com o hash original.
   * @returns Um booleano indicando se os hashes são iguais.
   *
   * @throws {Error} Se houver um erro durante o processo de comparação.
   *
   * @public
   */
  compare(hash: string, compare_hash: string): boolean;
}
