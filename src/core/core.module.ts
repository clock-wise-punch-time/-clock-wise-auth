import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './config/jwt.strategy';
import { GenerateCodeUtil } from './utils/generete-code.util';
import { HasherUtil } from './utils/hasher.util';
import { RSAUtil } from './utils/rsa.util';
import { RegistrationUtil } from './utils/registration.util';
import { DocumentUtil } from './utils/document.util';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { DateUtil } from './utils/date.util';
import { HttpModule } from '@nestjs/axios';
import { UserPermissionGuard } from './guards/user-permission.guard';
import { SecurityGuard } from './guards/security.guard';

const { MAIL_NAME, MAIL_FROM, MAIL_HOST, MAIL_USER, MAIL_PASS, MAIL_PORT } =
  process.env;

@Global()
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
      // @ts-ignore
      store: async () =>
        await redisStore({
          socket: {
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
          },
        }),
    }),
    PassportModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET_KEY}`,
      signOptions: { expiresIn: '5mn' },
    }),
    MailerModule.forRoot({
      transport: {
        host: MAIL_HOST,
        port: Number(MAIL_PORT),
        auth: {
          user: MAIL_USER,
          pass: MAIL_PASS,
        },
      },
      preview: true,
      defaults: {
        from: `"${MAIL_NAME}" <${MAIL_FROM}>`,
      },
    }),
  ],
  providers: [
    JwtService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: SecurityGuard,
    },
    {
      provide: APP_GUARD,
      useClass: UserPermissionGuard,
    },
    {
      provide: 'GenerateCode',
      useClass: GenerateCodeUtil,
    },
    {
      provide: 'Hasher',
      useClass: HasherUtil,
    },
    {
      provide: 'RSA',
      useClass: RSAUtil,
    },
    {
      provide: 'Registration',
      useClass: RegistrationUtil,
    },
    {
      provide: 'Document',
      useClass: DocumentUtil,
    },
    {
      provide: 'Date',
      useClass: DateUtil,
    },
  ],
  exports: [
    JwtService,
    JwtStrategy,
    {
      provide: 'GenerateCode',
      useClass: GenerateCodeUtil,
    },
    {
      provide: 'Hasher',
      useClass: HasherUtil,
    },
    {
      provide: 'RSA',
      useClass: RSAUtil,
    },
    {
      provide: 'Registration',
      useClass: RegistrationUtil,
    },
    {
      provide: 'Document',
      useClass: DocumentUtil,
    },
    {
      provide: 'Date',
      useClass: DateUtil,
    },
  ],
})
export class CoreModule {}
