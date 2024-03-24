export class CustomException extends Error {
  constructor(message: string, stack?: string) {
    super(message);
    this.name = 'CustomException';
    if (stack) {
      this.stack = stack;
    }
  }
}
