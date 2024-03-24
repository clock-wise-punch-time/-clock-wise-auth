import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { Public } from 'src/core/decorators/public.decorator';
import { RequestUser } from 'src/core/types/request.types';
import { LoginDTO } from '../dtos/login.dto';
import { RefreshTokenDTO } from '../dtos/refresh-token.dto';
import { RegisterDTO } from '../dtos/register.dto';
import { LogginMapper } from '../mappers/login.mapper';
import { LoginUseCase } from '../usecases/auth/login.usecase';
import { RefreshTokenUseCase } from '../usecases/auth/refresh-token.usecase';
import { RegisterUseCase } from '../usecases/auth/register.usecase';
import { RefreshTokenMapper } from '../mappers/refresh-token.mapper';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { ForgotPasswordDTO } from '../dtos/forgot-password.dto';
import { ResetPasswordDTO } from '../dtos/reset-password.dto';
import { ConfirmEmailDTO } from '../dtos/confirm-email.dto';
import { ResetEmailDTO } from '../dtos/reset-email.dto';
import { ConfirmEmailUseCase } from '../usecases/auth/confirm-email.usecase';
import { ForgotPasswordUseCase } from '../usecases/auth/forgot-password.usecase';
import { RequestResetEmailUseCase } from '../usecases/auth/request-reset-email.usecase';
import { ResetEmailUseCase } from '../usecases/auth/reset-email.usecase';
import { ResetPasswordUseCase } from '../usecases/auth/reset-password.usecase';

@ApiBearerAuth()
@ApiTags('Authentication')
@Controller('v1/auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
    private readonly resetEmailUseCase: ResetEmailUseCase,
    private readonly requestResetEmailUseCase: RequestResetEmailUseCase,
    private readonly confirmEmailUseCase: ConfirmEmailUseCase,
  ) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 200, description: 'User registered successfully' })
  @ApiBadRequestResponse({
    description: 'Invalid data provided for registration',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async register(@Body() data: RegisterDTO): Promise<void> {
    return await this.registerUseCase.execute(data);
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiBadRequestResponse({ description: 'Invalid credentials provided' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async login(@Body() data: LoginDTO): Promise<LogginMapper> {
    return await this.loginUseCase.execute(data);
  }

  @HttpCode(200)
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh authentication tokens' })
  @ApiResponse({ status: 200, description: 'Tokens refreshed successfully' })
  @ApiBadRequestResponse({
    description: 'Invalid token or data provided for token refresh',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async refresh(
    @Req() request: RequestUser,
    @Body() data: RefreshTokenDTO,
  ): Promise<RefreshTokenMapper> {
    return await this.refreshTokenUseCase.execute({ ...request, ...data });
  }

  @HttpCode(200)
  @Public()
  @Post('forgot/password')
  @ApiOperation({ summary: 'Initiate password reset process' })
  @ApiResponse({
    status: 200,
    description: 'Password reset initiated successfully',
  })
  @ApiBadRequestResponse({ description: 'Invalid email provided' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async forgotPassword(@Body() data: ForgotPasswordDTO): Promise<void> {
    return await this.forgotPasswordUseCase.execute(data);
  }

  @HttpCode(200)
  @Public()
  @Post('reset/password')
  @ApiOperation({ summary: 'Reset user password' })
  @ApiResponse({ status: 200, description: 'Password reset successful' })
  @ApiBadRequestResponse({
    description: 'Invalid data provided for password reset',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async resetPassword(@Body() data: ResetPasswordDTO): Promise<void> {
    return await this.resetPasswordUseCase.execute(data);
  }

  @HttpCode(200)
  @Public()
  @Post('confirm/email')
  @ApiOperation({ summary: 'Confirm user email' })
  @ApiResponse({ status: 200, description: 'Email confirmed successfully' })
  @ApiBadRequestResponse({ description: 'Invalid confirmation data provided' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async confirmEmail(@Body() data: ConfirmEmailDTO): Promise<void> {
    return await this.confirmEmailUseCase.execute(data);
  }

  @HttpCode(200)
  @Post('request/reset/email')
  @ApiOperation({ summary: 'Request email reset' })
  @ApiResponse({ status: 200, description: 'Email reset request successful' })
  @ApiBadRequestResponse({
    description: 'Invalid data provided for email reset request',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async requestResetEmail(@Req() request: RequestUser): Promise<void> {
    return await this.requestResetEmailUseCase.execute(request);
  }

  @HttpCode(200)
  @Public()
  @Post('reset/email')
  @ApiOperation({ summary: 'Reset user email' })
  @ApiResponse({ status: 200, description: 'Email reset successful' })
  @ApiBadRequestResponse({
    description: 'Invalid data provided for email reset',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async resetmail(@Body() data: ResetEmailDTO): Promise<void> {
    return await this.resetEmailUseCase.execute(data);
  }
}
