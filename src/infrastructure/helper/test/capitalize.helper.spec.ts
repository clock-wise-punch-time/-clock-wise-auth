import { capitalize } from '../capitalize.helper';
import { describe, test, expect } from 'vitest';

describe('Capitalize Helper', () => {
  test('should capitalize the first letter of a string', () => {
    const result = capitalize('hello world');
    expect(result).toBe('Hello World');
  });

  test('should handle already capitalized strings', () => {
    const result = capitalize('Hello World');
    expect(result).toBe('Hello World');
  });

  test('should handle empty string', () => {
    const result = capitalize('');
    expect(result).toBe('');
  });

  test('should handle strings with only one character', () => {
    const result = capitalize('a');
    expect(result).toBe('A');
  });

  test('should handle strings with leading whitespace', () => {
    const result = capitalize('  hello world');
    expect(result).toBe('  Hello World');
  });

  test('should handle strings with trailing whitespace', () => {
    const result = capitalize('hello world  ');
    expect(result).toBe('Hello World  ');
  });

  test('should handle strings with multiple whitespace between words', () => {
    const result = capitalize('hello    world');
    expect(result).toBe('Hello    World');
  });

  test('should handle strings with non-alphabetic characters', () => {
    const result = capitalize('123hello world!@#');
    expect(result).toBe('123hello World!@#');
  });
});
