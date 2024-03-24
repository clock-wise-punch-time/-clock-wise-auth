import { describe, expect, it } from "vitest";
import { PrismaToJson } from "../core";
;

describe("PrismaToJson", () => {
  const prismaToJson = new PrismaToJson();

  it("deve converter o esquema do Prisma para JSON", () => {
    const path = __dirname + "/mock/schema.prisma";
    const resultado = prismaToJson.convert(path);

    expect(resultado).toBeDefined();
    expect(resultado.models).toHaveLength(2);
    expect(resultado.enums).toHaveLength(0);
    expect(resultado.relationships).toHaveLength(2);
  });

  it("deve lançar uma exceção em caso de erro", () => {
    const path = __dirname + "/mock/prisma.schema";

    expect(() => prismaToJson.convert(path)).toThrowError();
  });
});
