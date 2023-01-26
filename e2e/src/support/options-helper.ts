const stringLevelIsT = <T extends string>(string: string, options: readonly string[]): string is T => {
  return options.includes(string);
};

export const stringIsOfOptions = <T extends string>(stringLevel: string, options: readonly string[]): T => {
  if (stringLevelIsT(stringLevel, options)) {
    return stringLevel as T;
  }
  throw Error(`🧨 String '${stringLevel}' needs to be one of ${options} 🧨`);
};