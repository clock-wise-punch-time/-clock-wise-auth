import * as crypto from 'crypto';
import { Logger } from '@nestjs/common';
import { RSAInterface } from './interfaces/rsa.interface';

export class RSAUtil implements RSAInterface {
  protected logger = new Logger(RSAUtil.name);

  protected publicKey: string;
  protected privateKey: string;
  protected passphrase: string;

  constructor() {
    this.passphrase = process.env.PASSPHRASE;
    this.publicKey = process.env.PUBLIC_KEY;
    this.privateKey = process.env.PRIVATE_KEY;
  }

  encrypt(data: Record<string, unknown>): string {
    const textJsonToString = JSON.stringify(data);
    const bufferData = Buffer.from(textJsonToString, 'utf8');
    const encryptedData = crypto.publicEncrypt(this.publicKey, bufferData);
    return encryptedData.toString('base64');
  }

  decrypt(encryptedData: string): Record<string, unknown> {
    try {
      const bufferData = Buffer.from(encryptedData, 'base64');
      const decryptedData = crypto.privateDecrypt(
        {
          key: this.privateKey,
          passphrase: this.passphrase,
        },
        bufferData,
      );
      const textPlain = decryptedData.toString('utf8');
      return JSON.parse(textPlain);
    } catch (error) {
      this.logger.error(error);
      throw new Error(error.message);
    }
  }
}
