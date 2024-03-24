export class CustomExceptionMapper {
  public error: {
    status: number;
    message: string;
    details: {
      timestamp: string;
      path: string;
      code: number;
      description: string;
    };
  };
  constructor(props: CustomExceptionMapper) {
    Object.assign(this, props);
  }
}
