import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { CustomException } from 'src/domain/entities/error/custom-exception';
import { CustomExceptionMapper } from 'src/domain/mappers/custom-exception.mapper';
import { capitalize } from '../helper/capitalize.helper';
import { Request, Response } from 'express';

@Catch(HttpException)
export class ErrorHttpFilter implements ExceptionFilter {
  protected logger = new Logger('ERROR');
  private httpAdapter: AbstractHttpAdapter;

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest() as Request;

    const errorBody = this.bodyBuilder(exception, request);

    if (exception instanceof CustomException) {
      throw exception;
    }

    this.errorLog(exception, errorBody);
    this.errorResponse(response, errorBody);
  }

  errorLog(
    exception: Partial<CustomException & Error>,
    data: CustomExceptionMapper,
  ) {
    const code = data.error.details.code;
    const description = data.error.details.description;
    return this.logger.error(`CODE: ${code} ${description}`, exception.stack);
  }

  bodyBuilder(exception: HttpException, request: Request) {
    const path = request.path;
    const status = exception.getStatus();
    const message = exception.message;
    const errorMessage = capitalize(HttpStatus[status].replaceAll('_', ' '));

    const error = new CustomExceptionMapper({
      error: {
        status: status,
        message: errorMessage,
        details: {
          timestamp: new Date().toISOString(),
          path,
          code: status,
          description: message,
        },
      },
    });
    return error;
  }

  errorResponse(response: Response, body: CustomExceptionMapper) {
    const status = body.error.status || 500;
    return this.httpAdapter.reply(response, body, status);
  }
}
