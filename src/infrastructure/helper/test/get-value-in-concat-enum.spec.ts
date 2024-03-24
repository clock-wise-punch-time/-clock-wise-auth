import { describe, test, expect } from 'vitest';
import { getValueInConcatEnum } from '../get-value-in-concat-enum';

describe('getValueInConcatEnum helper', () => {
  const enum1 = {
    Key1: 'Value1',
    Key2: 'Value2',
  };

  const enum2 = {
    Key3: 'Value3',
    Key4: 'Value4',
  };

  const concatEnums = [enum1, enum2];

  test('should return value for existing key in first enum', () => {
    const result = getValueInConcatEnum(concatEnums, 'Key1');
    expect(result).toBe('Value1');
  });

  test('should return value for existing key in second enum', () => {
    const result = getValueInConcatEnum(concatEnums, 'Key3');
    expect(result).toBe('Value3');
  });

  test('should return undefined for non-existing key', () => {
    const result = getValueInConcatEnum(concatEnums, 'Key5');
    expect(result).toBeUndefined();
  });

  test('should return undefined for empty enum array', () => {
    const result = getValueInConcatEnum([], 'Key1');
    expect(result).toBeUndefined();
  });

  test('should return undefined for undefined enum array', () => {
    const result = getValueInConcatEnum(undefined, 'Key1');
    expect(result).toBeUndefined();
  });

  test('should return undefined for null enum array', () => {
    const result = getValueInConcatEnum(null, 'Key1');
    expect(result).toBeUndefined();
  });
});
