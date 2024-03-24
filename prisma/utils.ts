import { statSync } from "fs";
import { Root } from "./@types";

export function isDependencyInstalled(dependencyName: string) {
  const nodeModulesPath = process.cwd() + "/node_modules/"
  const dependencyPath = nodeModulesPath + dependencyName

  try {
    const isInstalled = statSync(String(dependencyPath)).isDirectory();
    return isInstalled;
  } catch (error) {
    return false;
  }
}

export function isEnumType(enums: Root["enums"], type: string | unknown) {
  return enums.some((enumItem) =>
    new RegExp(`^${enumItem.name}$`, "i").test(
      String(type).replace(/[\[\]]|\?/g, "")
    )
  );
}

export function isModel(models: Root["models"], type: string | unknown) {
  return models.some((enumItem) =>
    new RegExp(`^${enumItem.name}$`, "i").test(
      String(type).replace(/[\[\]]|\?/g, "")
    )
  );
}

export function capitalizeFirstLetter(input: string): string {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function capitalizeAfterUnderscore(input: any) {
  return input.replace(/(?:^|_)(.)/g, (_: any, match: string) => match.toUpperCase());
}
