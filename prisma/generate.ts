import { PrismaToJson } from "./core";
import { exec } from 'child_process'
import { writeFileSync } from "fs";
import { contract } from "./templates/contract.template";
import { repositoryModule } from "./templates/repository.module.template";
import { entity } from "./templates/entity.contract.template";
import { repository } from "./templates/repository.template";
import { type } from "./templates/types.contract.template";

const schemaPath = __dirname + "/schema.prisma";

const prismaToJson = new PrismaToJson();
const result = prismaToJson.convert(schemaPath);

const contract_output =
  process.cwd() + "/src/domain/repositories/interfaces/prisma.interfaces.ts";
writeFileSync(contract_output, String(contract(result)), "utf-8");

const repository_output =
  process.cwd() + "/src/domain/repositories/prisma.repository.ts";
writeFileSync(
  repository_output,
  String(repository()),
  "utf-8"
);


const repository_module_output =
  process.cwd() + "/src/domain/repositories/repository.module.ts";
writeFileSync(repository_module_output, String(repositoryModule(result)), "utf-8");

result.models.forEach(({ name, fields }) => {
  const output =
    process.cwd() +
    `/src/domain/entities/${String(name).toLocaleLowerCase()}.ts`;
  writeFileSync(
    output,
    String(
      entity(
        name,
        fields,
        result.enums,
        result.models,
      )
    ),
    "utf-8"
  );
});

result.models.forEach(({ name, fields }) => {
  const output =
    process.cwd() +
    `/src/domain/types/${String(name).toLocaleLowerCase()}.ts`;
  writeFileSync(
    output,
    String(
      type(
        name,
        fields,
        result.enums,
        result.models,
      )
    ),
    "utf-8"
  );
});


exec("npx prisma format", (_error, stdout) => {
    console.log(stdout)
});
exec("npx prisma generate", (_error, stdout) => {
    console.log(stdout)
});
exec("npm run format", (_error, stdout) => {
  console.log(stdout);
});