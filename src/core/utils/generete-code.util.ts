import { Injectable } from "@nestjs/common";
import { randomBytes } from "crypto";
import { GenerateCodeInterface } from "./interfaces/generate-code.interface";

@Injectable()
export class GenerateCodeUtil implements GenerateCodeInterface {
  six(): string {
    return Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
  }

  opac() {
    return randomBytes(16).toString("hex");
  }
}
