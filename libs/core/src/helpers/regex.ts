export function escapeRegExp(value: RegExp | string) {
  let regex: string;
  regex = (value as unknown as RegExp).source || value as string;

  return regex.replace(
      /[.*\-+?^${}()|[\]\\]/g,
      '\\$&',
  ); // $& means the whole matched string
}
