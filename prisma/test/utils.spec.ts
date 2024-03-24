import { describe, expect, it, vitest } from "vitest";
import {
  capitalizeAfterUnderscore,
  capitalizeFirstLetter,
  isDependencyInstalled,
  isEnumType,
  isModel,
} from "../utils";

describe("utils.ts", () => {
  describe("isDependencyInstalled", () => {
    it("should return true for an installed dependency", () => {
      vitest.spyOn(require("fs"), "statSync").mockReturnValueOnce({
        isDirectory: () => true,
      } as any);

      expect(isDependencyInstalled("prisma")).toBeTruthy();
    });

    it("should return false for a non-installed dependency", () => {
      vitest.spyOn(require("fs"), "statSync").mockImplementationOnce(() => {
        throw new Error("Mock error");
      });

      expect(isDependencyInstalled("nonExistentDependency")).toBeFalsy();
    });
  });

  describe("isEnumType", () => {
    const enums = [
      { name: "EnumType1", values: ["TEST"] },
      { name: "EnumType2", values: ["TEST"] },
    ];
    it("should return true for a valid enum type", () => {
      expect(isEnumType(enums, "EnumType1")).toBeTruthy();
      expect(isEnumType(enums, "enumtype2")).toBeTruthy();
    });

    it("should return false for an invalid enum type", () => {
      expect(isEnumType(enums, "NonExistentEnum")).toBeFalsy();
    });
  });

  describe("isModel", () => {
    const models = [
      { name: "Model1", fields: [] },
      { name: "Model2", fields: [] },
    ];

    it("should return true for a valid model", () => {
      expect(isModel(models, "Model1")).toBeTruthy();
      expect(isModel(models, "model2")).toBeTruthy();
    });

    it("should return false for an invalid model", () => {
      expect(isModel(models, "NonExistentModel")).toBeFalsy();
    });
  });

  describe("capitalizeFirstLetter", () => {
    it("should capitalize the first letter of a string", () => {
      expect(capitalizeFirstLetter("test")).toBe("Test");
    });
  });

  describe("capitalizeAfterUnderscore", () => {
    it("should capitalize letters after underscores", () => {
      expect(capitalizeAfterUnderscore("test_string")).toBe("TestString");
    });
  });
});
