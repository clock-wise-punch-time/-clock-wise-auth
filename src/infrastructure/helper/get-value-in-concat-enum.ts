export function getValueInConcatEnum(
  enumArray: any[] | undefined | null,
  key: string,
): unknown {
  if (!enumArray) {
    return undefined;
  }

  for (const enumObj of enumArray) {
    if (enumObj && enumObj.hasOwnProperty(key)) {
      return enumObj[key];
    }
  }

  return undefined;
}
