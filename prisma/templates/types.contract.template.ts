import { Enum, Field, Model } from "prisma/@types";
import { capitalizeAfterUnderscore, isEnumType, isModel } from "../utils";

export const type = (
  model: string,
  fields: Field[],
  enums: Enum[],
  models: Model[]
) => {
  const typeName = capitalizeAfterUnderscore(model);
  return `
export type ${typeName} = {
${Array.from(fields ?? [])
    .flatMap(({ name, type }) => {
      if (isEnumType(enums,type)) {
        const setEnum = enums.filter(
          (element) => element.name === type.replace(/[\[\]]|\?/g, "")
        )[0].values;
        return `${name}: ${setEnum
          .flatMap((item) => `"${item}"`)
          .join(" | ")}`;
      }

      if (isModel(models, type)) {
        return null;
      }
      return `${name}: ${type}`;
    })
    .filter((field) => field)
    .join("\n")}
}
    `;
};
