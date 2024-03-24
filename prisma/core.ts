import * as fs from "fs";
import { Root, RelationDetails, Field } from "./@types";

export class PrismaToJson {
  public sections: any = {
    models: [],
    enums: [],
    relationships: [],
  } as any;

  private currentSection: string = "";

  public convert(path: string): Root {
    try {
      const prismaSchema = fs.readFileSync(path, "utf-8");

      prismaSchema.split("\n").forEach((line) => {
        const trimmedLine = line.trim();

        if (trimmedLine.startsWith("model ")) {
          this.handleModelSection(trimmedLine);
        } else if (trimmedLine.startsWith("enum ")) {
          this.handleEnumSection(trimmedLine);
        } else if (trimmedLine.startsWith("}")) {
          this.currentSection = "";
        } else {
          if (!trimmedLine.startsWith("@")) {
            this.handleFieldSection(trimmedLine);
          }
        }
      });

      this.extractRelationships();

      return this.sections;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public export() {
    const jsonResult = JSON.stringify(this.sections, null, 2);

    const outputFilePath = __dirname + "/prisma-schema.json";
    fs.writeFileSync(outputFilePath, jsonResult, "utf-8");
  }

  private handleModelSection(line: string): void {
    const modelName = line.split(" ")[1].trim();
    if (modelName !== "") {
      this.sections.models.push({
        name: modelName,
        fields: [],
      });
      this.currentSection = "models";
    }
  }

  private handleEnumSection(line: string): void {
    this.sections.enums.push({
      name: line.split(" ")[1],
      values: [],
    });
    this.currentSection = "enums";
  }

  private handleFieldSection(trimmedLine: string): void {
    const currentModel =
      this.sections[this.currentSection]?.[
        this.sections[this.currentSection].length - 1
      ] ;

    if (currentModel && trimmedLine !== "") {
      const fieldParts = trimmedLine.split(" ");
      const field: Field = {
        name: fieldParts[0],
        type: "",
      };

      field.type = this.inferTypeFromDirectives(fieldParts.slice(1));
      const relationDirectiveIndex = fieldParts.findIndex((part) =>
        part.startsWith("@relation")
      );

      if (relationDirectiveIndex !== -1) {
        const relationDetails: RelationDetails = this.extractRelationDetails(
          fieldParts.slice(relationDirectiveIndex)
        );
        field.relation = relationDetails;
      }

      currentModel?.fields?.push(field);
      this.sections[this.currentSection]?.[
        this.sections[this.currentSection].length - 1
      ]?.values?.push(field.name);
    }
  }

  private inferTypeFromDirectives(directives: string[]): string {
    const directiveString = directives.join(" ").replace(/\s+/g, "");
    const typeRegexMap: Record<string, RegExp> = {
      string: /\bString\b/,
      number: /\b(Int|Float)\b/,
      boolean: /\bBoolean|Boolean?\b/,
      Date: /\bDateTime|DateTime?\b/,
    };

    for (const [type, regex] of Object.entries(typeRegexMap)) {
      if (regex.test(directiveString)) {
        return type;
      }
    }

    let relationType = directiveString.trim();
    if (relationType.includes("@")) {
      relationType = relationType.split("@")[0];
    }
    return relationType;
  }

  private extractRelationDetails(directives: string[]): RelationDetails {
    let relationDetails: RelationDetails = {
      fields: [],
      references: [],
      onDelete: undefined,
      onUpdate: undefined,
    };

    const relationDirective = directives.join(" ");

    const matches = relationDirective.match(
      /@relation\s*\(\s*fields\s*:\s*\[([^\]]+)]\s*,\s*references\s*:\s*\[([^\]]+)]\s*(?:,\s*onDelete\s*:\s*([^\s\)]+))?/
    );

    if (matches && matches.length >= 3) {
      relationDetails.fields = matches[1]
        .split(",")
        .map((field) => field.trim());
      relationDetails.references = matches[2]
        .split(",")
        .map((reference) => reference.trim());
      relationDetails.onDelete = matches[3]?.trim();
      relationDetails.onUpdate = matches[4]?.trim();
    }

    return relationDetails;
  }

  private extractRelationships(): void {
    const types = ["string", "boolean", "number", "Date"];
    this.sections.models.forEach((model: any) => {
      const relations: Array<{ name: string; relation: string }> = [];
      model.fields.forEach((field: any) => {
        if (field.relation || !this.isEnumType(field.type)) {
          if (
            field.name !== field.type && !types.includes(field.type) &&
            this.isModel(field.type.replace(/[\[\]]|\?/g, ""))
          ) {
            relations.push({
              name: String(field.name).replace(/\?/g, ""),
              relation: String(field.type).replace(/\?/g, ""),
            });
          }
          if (field.name === field.type !== types.includes(field.type)) {
            relations.push({
              name: String(field.type).replace(/\?/g, ""),
              relation: String(field.type).replace(/\?/g, ""),
            });
          }
        }
      });
      this.sections.relationships.push({
        model: model.name,
        relations: relations.filter(
          (value) =>
            value.name !== null &&
            value.name !== "" &&
            !types.includes(value.name)
        ),
      });
    });
  }

  public isEnumType(type: string | unknown) {
    return this?.sections?.enums.some((enumItem: any) =>
      new RegExp(`^${enumItem.name}$`, "i").test(
        String(type).replace(/[\[\]]|\?/g, "")
      )
    );
  }

  public isModel(type: string | unknown) {
    return this?.sections?.models.some((enumItem: any) =>
      new RegExp(`^${enumItem.name}$`, "i").test(
        String(type).replace(/[\[\]]|\?/g, "")
      )
    );
  }
}
