import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory, PartialGraphHost } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { useContainer } from "class-validator";
import * as compression from "compression";
import { writeFileSync } from "fs";
import helmet from "helmet";
import { AppModule } from "./app.module";
import { PrismaConnection } from "./domain/connection/prisma.connection";
import { LoggingInterceptor } from "./infrastructure/interceptors/logging.interceptor";
import * as fs from "fs";
import * as express from "express";
import { join } from "path";
import { config } from "dotenv";
config();

const logger = new Logger(bootstrap.name);

function generateKeys() {
  const publicKeyContent = process.env.PUBLIC_KEY;
  const privateKeyContent = process.env.PRIVATE_KEY;

  const rootDir = process.cwd();
  fs.writeFile(
    `${rootDir}/security/keys/public_key.pem`,
    publicKeyContent,
    () => {},
  );
  fs.writeFile(
    `${rootDir}/security/keys/private_key.pem`,
    privateKeyContent,
    () => {},
  );
}

async function bootstrap() {
  generateKeys();
  process.env.TZ = "UTC";
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    forceCloseConnections: true,
    abortOnError: false,
  });
  app.enableCors();

  const configService = app.get(ConfigService);

  app.use(compression());
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          "style-src": [
            "'self'",
            "https://fonts.googleapis.com",
            "'unsafe-inline'",
          ],
          "connect-src": ["'self'", "https://api.fpjs.io"],
          "script-src": [
            "'self'",
            "'unsafe-inline'",
            "'unsafe-eval'",
            "https://www.google.com",
            "https://www.gstatic.com",
            "https://fpjscdn.net",
          ],
          "frame-src": ["'self'", "https://www.google.com"],
        },
      },
    }),
  );
  app.use(express.static(join(__dirname, "..", "public")));

  app.get(PrismaConnection, { strict: false });
  app.enableShutdownHooks();

  const config = new DocumentBuilder()
    .setTitle("Clock-Wise Auth")
    .setDescription("Authentication System")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("v1/doc", app, document);

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      whitelist: true,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.startAllMicroservices();

  async function gracefulShutdown(signal: NodeJS.Signals) {
    await app.close();
    process.kill(process.pid, signal);
  }

  process.on("SIGINT", gracefulShutdown);
  process.on("SIGTERM", gracefulShutdown);

  const PORT = configService.get("PORT") ?? 3000;
  await app.listen(PORT, () => {
    logger.verbose(`
    
    //////////////////////////////
    //////////////////////////////
    //////////////////////////////
    //////////%,,,,@,,,,%(////////
    ///////%,,,,,..@..,,,,,%//////
    //////%,,,.... @ ....,,,%/////
    //////%,,,...  %@@@@@@,,%(////
    //////%,,,....# .....,,,%(////
    ///////%,,,,,.....,,,,*%(/////
    /////////(%,,,,,,,,,%#(///////
    /////////////(((((////////////
    //////////////////////////////

          ⌚ CLOCK WISE AUTH

    ✅ Available at the port ${PORT}
    🚀 Deploy to the ${process.env.NODE_ENV}
    `);
  });
}

bootstrap().catch(err => {
  try {
    writeFileSync("graph.json", PartialGraphHost.toString() ?? "");
  } catch (error) {
    logger.error("Error when trying to write graph.json.");
    logger.error(error);
  }
  logger.error(err);
  process.exit(1);
});
