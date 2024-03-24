import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { AbstractHttpAdapter, HttpAdapterHost } from "@nestjs/core";
import { RequestUser } from "src/core/types/request.types";
import { CustomException } from "src/domain/entities/error/custom-exception";
import { CustomExceptionMapper } from "src/domain/mappers/custom-exception.mapper";
import { APP_CODE } from "src/infrastructure/enums/app-code.enum";
import { APP_MESSAGE } from "src/infrastructure/enums/app-message.enum";
import { APP_STATUS_CODE } from "src/infrastructure/enums/app-status-code.enum";
import { HTTP_MESSAGE } from "src/infrastructure/enums/http-message.enum";
import { INFRA_CODE } from "src/infrastructure/enums/infra-code.enum";
import { INFRA_MESSAGE } from "src/infrastructure/enums/infra-message.enum";
import { INFRA_STATUS_CODE } from "src/infrastructure/enums/infra-status-code.enum";
import { getEnumKeyByValue } from "src/infrastructure/helper/get-enum-key-by-value.helper";
import { getValueInConcatEnum } from "src/infrastructure/helper/get-value-in-concat-enum";

@Catch(CustomException)
export class ErrorBuilderFilter implements ExceptionFilter {
  protected logger = new Logger("ERROR");
  private httpAdapter: AbstractHttpAdapter;

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  catch(
    exception: Partial<CustomException & Error>,
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest() as RequestUser;
    const user = request["user"];
    const path = request.path;

    console.log(exception);

    const identify = exception.message;
    const errorBody = this.bodyBuilder(identify, path);

    this.loggedInUserLog(user);
    this.errorLog(exception, errorBody);

    this.httpAdapter.reply(response, errorBody, errorBody.error.status);
  }

  loggedInUserLog(user: RequestUser["user"]) {
    if (user) {
      this.logger.verbose(
        `LOGGED WITH USER: ${user.user_id} ROLE: ${user.role}`,
      );
    }
  }

  errorLog(
    exception: Partial<CustomException & Error>,
    data: CustomExceptionMapper,
  ) {
    const code = data.error.details.code;
    const description = data.error.details.description;
    this.logger.error(`CODE: ${code} ${description}`, exception.stack);
  }

  bodyBuilder(identify: string, path: string) {
    const status = this.getStatus(identify);
    const code = this.getCode(identify);
    const message = this.getMessage(identify);

    const error = new CustomExceptionMapper({
      error: {
        status: status,
        message: String(getEnumKeyByValue(HttpStatus, status)),
        details: {
          timestamp: new Date().toISOString(),
          path,
          code,
          description: message,
        },
      },
    });
    return error;
  }

  getStatus(key: string) {
    const getValue = getValueInConcatEnum(
      [HttpStatus, APP_STATUS_CODE, INFRA_STATUS_CODE],
      key,
    );
    const defaultStatus = 500;
    return Number(getValue) || defaultStatus;
  }

  getCode(key: string) {
    const getValue = getValueInConcatEnum(
      [HttpStatus, APP_CODE, INFRA_CODE],
      key,
    );
    const defaultCode = 0;
    return Number(getValue) || defaultCode;
  }

  getMessage(key: string) {
    const getValue = getValueInConcatEnum(
      [HTTP_MESSAGE, APP_MESSAGE, INFRA_MESSAGE],
      key,
    );

    const defaultMessage = "ERROR_NOT_TRACKED";
    return String(getValue) || defaultMessage;
  }
}
