export interface RSAInterface {
  encrypt(data: Record<string, unknown>): string;
  decrypt(encryptedData: string): Record<string, unknown>;
}
