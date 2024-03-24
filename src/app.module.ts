import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { AuthController } from "./application/controllers/auth.controller";
import { ProvidersModule } from "./application/providers/provider.module";
import { CodeService } from "./application/services/code.service";
import { DeviceService } from "./application/services/device.service";
import { GuidelineAccepetedService } from "./application/services/guideline-accepted.service";
import { GuidelineService } from "./application/services/guideline.service";
import { RefreshTokenService } from "./application/services/refresh-token.service";
import { UserService } from "./application/services/user.service";
import { LoginUseCase } from "./application/usecases/auth/login.usecase";
import { RegisterUseCase } from "./application/usecases/auth/register.usecase";
import { CoreModule } from "./core/core.module";
import { RepositoryModule } from "./domain/repositories/repository.module";
import { IpBlocklistService } from "./application/services/IpBlocklist.service";
import { RefreshTokenUseCase } from "./application/usecases/auth/refresh-token.usecase";
import { APP_INTERCEPTOR, APP_FILTER } from "@nestjs/core";
import { ErrorBuilderFilter } from "./infrastructure/filters/error-builder.filter";
import { HttpErrorHandler } from "./infrastructure/interceptors/http-error-handle.interceptor";
import { LoggingInterceptor } from "./infrastructure/interceptors/logging.interceptor";
import { ErrorHttpFilter } from "./infrastructure/filters/error-http.filter";
import { ForgotPasswordUseCase } from "./application/usecases/auth/forgot-password.usecase";
import { ResetPasswordUseCase } from "./application/usecases/auth/reset-password.usecase";
import { RequestResetEmailUseCase } from "./application/usecases/auth/request-reset-email.usecase";
import { ConfirmEmailUseCase } from "./application/usecases/auth/confirm-email.usecase";
import { ResetEmailUseCase } from "./application/usecases/auth/reset-email.usecase";
import { AppController } from "./app.controller";

@Module({
  imports: [CoreModule, RepositoryModule, ProvidersModule],
  controllers: [AppController, AuthController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorHttpFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorBuilderFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpErrorHandler,
    },
    UserService,
    CodeService,
    DeviceService,
    GuidelineService,
    GuidelineAccepetedService,
    RefreshTokenService,
    IpBlocklistService,
    LoginUseCase,
    RegisterUseCase,
    RefreshTokenUseCase,
    ForgotPasswordUseCase,
    ResetPasswordUseCase,
    ResetEmailUseCase,
    RequestResetEmailUseCase,
    ConfirmEmailUseCase,
  ],
})
export class AppModule {}
