import { FingerprintMapper } from '../../mappers/fingerprint.mapper';

export interface FingerprintInterface {
  capture(fingerprintId: string): Promise<FingerprintMapper>;
}
