export interface RecaptchaInterface {
  verify(token: string): Promise<boolean>;
}
