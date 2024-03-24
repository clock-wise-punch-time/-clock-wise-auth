export function getEnumKeyByValue(
  enumObj: any,
  value: number,
): string | undefined {
  if (enumObj == null) {
    return undefined;
  }

  return Object.keys(enumObj).find(key => enumObj[key] === value);
}
