import { Global, Module } from "@nestjs/common";
import { FingerprintProvider } from "./fingerprint.provider";
import { SMTPProvider } from "./smtp.provider";
import { GoogleRecaptcha } from "./google-recaptcha.provider";

@Global()
@Module({
  providers: [
    {
      provide: "Fingerprint",
      useClass: FingerprintProvider,
    },
    {
      provide: "SMTP",
      useClass: SMTPProvider,
    },
    {
      provide: "Recaptcha",
      useClass: GoogleRecaptcha,
    },
  ],
  exports: [
    {
      provide: "Fingerprint",
      useClass: FingerprintProvider,
    },
    {
      provide: "SMTP",
      useClass: SMTPProvider,
    },
    {
      provide: "Recaptcha",
      useClass: GoogleRecaptcha,
    },
  ],
})
export class ProvidersModule {}
