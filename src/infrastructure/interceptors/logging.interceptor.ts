import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  protected logger = new Logger("LOGGING TIME");
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.warn("Before...");
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => this.logger.warn(`After... ${Date.now() - now}ms`)));
  }
}
