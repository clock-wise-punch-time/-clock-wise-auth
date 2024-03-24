import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { CustomException } from "src/domain/entities/error/custom-exception";
import { errorEmitter } from "../helper/error-emitter.helper";
import { ERROR_NAME } from "../enums/error-name.enum";
import { HTTP_NAME } from "../enums/http-name.enum";

@Injectable()
export class HttpErrorHandler implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(exception => {
        if (exception instanceof CustomException) {
          return throwError(() => exception);
        }

        this.isDatabase(exception);
        this.isBodyInvalid(exception);

        errorEmitter(exception, [
          [Error, ERROR_NAME.INTERNAL_SYSTEM_ERROR, "TypeError"],
        ]);
        return throwError(() => exception);
      }),
    );
  }

  isCustomException(exception: any) {
    if (exception instanceof CustomException) {
      return throwError(() => exception);
    }
  }

  isDatabase(exception: Error) {
    errorEmitter(exception, [
      [
        Prisma.PrismaClientKnownRequestError,
        ERROR_NAME.DATABASE_DATA_CONFLICT_ERROR,
      ],
      [
        Prisma.PrismaClientUnknownRequestError,
        ERROR_NAME.DATABASE_CONNECTION_ERROR,
      ],
      [
        Prisma.PrismaClientRustPanicError,
        ERROR_NAME.DATABASE_CONNECTION_FAILURE,
      ],
      [
        Prisma.PrismaClientInitializationError,
        ERROR_NAME.DATABASE_CONNECTION_ERROR,
      ],
      [Prisma.PrismaClientValidationError, ERROR_NAME.DATABASE_SYNTAX_ERROR],
    ]);
  }

  isBodyInvalid(exception: Error) {
    errorEmitter(exception, [
      [BadRequestException, HTTP_NAME.UNPROCESSABLE_ENTITY, "ValidationPipe"],
    ]);
    errorEmitter(exception, [
      [HttpException, HTTP_NAME.UNPROCESSABLE_ENTITY, "ParseIntPipe"],
    ]);
    errorEmitter(exception, [
      [HttpException, HTTP_NAME.UNPROCESSABLE_ENTITY, "ParseFloatPipe"],
    ]);
    errorEmitter(exception, [
      [HttpException, HTTP_NAME.UNPROCESSABLE_ENTITY, "ParseBoolPipe"],
    ]);
    errorEmitter(exception, [
      [HttpException, HTTP_NAME.UNPROCESSABLE_ENTITY, "ParseArrayPipe"],
    ]);
    errorEmitter(exception, [
      [HttpException, HTTP_NAME.UNPROCESSABLE_ENTITY, "ParseEnumPipe"],
    ]);
    errorEmitter(exception, [
      [HttpException, HTTP_NAME.UNPROCESSABLE_ENTITY, "DefaultValuePipe"],
    ]);
    errorEmitter(exception, [
      [HttpException, HTTP_NAME.UNPROCESSABLE_ENTITY, "ParseFilePipe"],
    ]);
  }
}
