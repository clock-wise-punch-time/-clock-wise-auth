import { describe, test, expect } from "vitest";
import { errorEmitter } from "../error-emitter.helper";
import { CustomException } from "../../../domain/entities/error/custom-exception";
import { ERROR_NAME } from "../../../infrastructure/enums/error-name.enum";

describe("errorEmitter helper", () => {
  const errorMessage = "Test Error";
  const stackTrace = "TestError: Test Error\n    at <anonymous>:1:13";

  test("should throw CustomException for matching error type without search string", () => {
    class TestError extends Error {}
    const error = new TestError();
    const errorMappings = [
      [TestError, ERROR_NAME.USER_NOT_FOUND],
    ] as unknown as [ErrorConstructor, ERROR_NAME, string?][];

    expect(() => errorEmitter(error, errorMappings)).toThrow(CustomException);
  });

  test("should throw CustomException for matching error type with search string", () => {
    class TestError extends Error {
      constructor(message: string) {
        super(message);
        this.stack = stackTrace;
      }
    }
    const error = new TestError(errorMessage);
    const errorMappings = [
      [TestError, ERROR_NAME.USER_NOT_FOUND, "TestError"],
    ] as unknown as [ErrorConstructor, ERROR_NAME, string?][];

    expect(() => errorEmitter(error, errorMappings)).toThrow(CustomException);
  });

  test("should not throw CustomException for non-matching error type", () => {
    class TestError extends Error {}
    const error = new TypeError(errorMessage);
    const errorMappings = [
      [TestError, ERROR_NAME.USER_NOT_FOUND],
    ] as unknown as [ErrorConstructor, ERROR_NAME, string?][];

    expect(() => errorEmitter(error, errorMappings)).not.toThrow(
      CustomException,
    );
  });

  test("should not throw CustomException for matching error type but non-matching search string", () => {
    class TestError extends Error {
      constructor(message: string) {
        super(message);
        this.stack = stackTrace;
      }
    }
    const error = new TestError(errorMessage);
    const errorMappings = [
      [TestError, ERROR_NAME.USER_NOT_FOUND, "NonMatching"],
    ] as unknown as [ErrorConstructor, ERROR_NAME, string?][];

    expect(() => errorEmitter(error, errorMappings)).not.toThrow(
      CustomException,
    );
  });

  test("should pass error stack when throwing CustomException", () => {
    class TestError extends Error {
      constructor(message: string) {
        super(message);
        this.stack = stackTrace;
      }
    }
    const error = new TestError(errorMessage);
    const errorMappings = [
      [TestError, ERROR_NAME.USER_NOT_FOUND],
    ] as unknown as [ErrorConstructor, ERROR_NAME, string?][];

    expect(() => errorEmitter(error, errorMappings)).toThrow(CustomException);
    try {
      errorEmitter(error, errorMappings);
    } catch (e) {
      expect(e.stack).toBe(error.stack);
    }
  });

  test("should throw CustomException without error stack when not provided", () => {
    class TestError extends Error {}
    const error = new TestError(errorMessage);
    const errorMappings = [
      [TestError, ERROR_NAME.USER_NOT_FOUND],
    ] as unknown as [ErrorConstructor, ERROR_NAME, string?][];

    expect(() => errorEmitter(error, errorMappings)).toThrow(CustomException);
    try {
      errorEmitter(error, errorMappings);
    } catch (e) {
      expect(e.stack).toBeTruthy();
    }
  });
});
