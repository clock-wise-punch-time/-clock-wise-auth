import { repl } from "@nestjs/core";
import { AppModule } from "./app.module";

/**
 * Inicializa o REPL (Read-Eval-Print Loop) para a aplicação NestJS.
 *
 * @remarks
 * Este método inicia o REPL para interagir com a aplicação NestJS.
 *
 * @alpha
 */
async function bootstrap() {
  /**
   * O método `repl` é utilizado para iniciar o REPL da aplicação.
   *
   * @param AppModule - O módulo principal da aplicação NestJS.
   * @returns Uma instância do REPL para interagir com a aplicação.
   */
  await repl(AppModule);
}

// Inicializa o REPL chamando a função bootstrap
bootstrap();
