import { describe, test, expect } from 'vitest';
import { getEnumKeyByValue } from '../get-enum-key-by-value.helper';

enum ExampleEnum {
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
}

describe('getEnumKeyByValue helper', () => {
  test('should return key for existing enum value', () => {
    const result = getEnumKeyByValue(ExampleEnum, 2);
    expect(result).toBe('Value2');
  });

  test('should return key for the first enum value if multiple values match', () => {
    const result = getEnumKeyByValue(ExampleEnum, 1);
    expect(result).toBe('Value1');
  });

  test('should return undefined for non-existing enum value', () => {
    const result = getEnumKeyByValue(ExampleEnum, 4);
    expect(result).toBeUndefined();
  });

  test('should return undefined for undefined enum object', () => {
    const result = getEnumKeyByValue(undefined, 2);
    expect(result).toBeUndefined();
  });

  test('should return undefined for undefined enum value', () => {
    const result = getEnumKeyByValue(ExampleEnum, undefined);
    expect(result).toBeUndefined();
  });

  test('should return undefined for null enum object', () => {
    const result = getEnumKeyByValue(null, 2);
    expect(result).toBeUndefined();
  });

  test('should return undefined for null enum value', () => {
    const result = getEnumKeyByValue(ExampleEnum, null);
    expect(result).toBeUndefined();
  });
});
