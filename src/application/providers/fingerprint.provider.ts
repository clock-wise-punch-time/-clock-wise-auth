import {
  FingerprintJsServerApiClient,
  Region,
} from '@fingerprintjs/fingerprintjs-pro-server-api';
import { Fingerprint } from '../../domain/types/fingerprint';
import { FingerprintMapper } from '../mappers/fingerprint.mapper';

export class FingerprintProvider {
  private client = new FingerprintJsServerApiClient({
    apiKey: process.env.FINGERPRINT_API_KEY,
    region: Region.Global,
  });

  async capture(fingerprintId: string) {
    const request = (await this.client.getEvent(
      fingerprintId,
    )) as unknown as Fingerprint;
    return new FingerprintMapper(request);
  }
}
