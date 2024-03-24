import { Enum, Field, Model } from "prisma/@types";
import { capitalizeAfterUnderscore, isEnumType, isModel } from "../utils";

export const entity = (
  model: string,
  fields: Field[],
  enums: Enum[],
  models: Model[]
) => {
  const className = capitalizeAfterUnderscore(model);
  return `
export class ${className} {
${Array.from(fields ?? [])
    .flatMap(({ name, type }) => {
      if (isEnumType(enums,type)) {
        const setEnum = enums.filter(
          (element) => element.name === type.replace(/[\[\]]|\?/g, "")
        )[0].values;
        return `public ${name}: ${setEnum
          .flatMap((item) => `"${item}"`)
          .join(" | ")}`;
      }

      if (isModel(models, type)) {
        return null;
      }
      return ` public ${name}: ${type}`;
    })
    .filter((field) => field)
    .join("\n")}

  constructor(
    props: Partial<${className}>,
    options?: {
      update?: boolean
    },
  ) {
    Object.assign(this, props)

    if (!props.id && !options?.update) {
      this.id = crypto.randomUUID()
    }
  }
}
    `;
};
