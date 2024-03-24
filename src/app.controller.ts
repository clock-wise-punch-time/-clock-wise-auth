import { Controller, Get } from "@nestjs/common";
import { readFileSync } from "fs";
import { resolve } from "path";
import { Public } from "./core/decorators/public.decorator";

@Controller()
export class AppController {
  @Public()
  @Get()
  root() {
    const indexHtml = readFileSync(resolve("public/index.html"), "utf8");
    return indexHtml;
  }
}
