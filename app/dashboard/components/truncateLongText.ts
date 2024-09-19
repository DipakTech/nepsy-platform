export function centerTruncate(str: string, length: number) {
  if (str.length <= length) return str;
  const textLength = Math.floor((length - 3) / 2);
  const first = str.slice(0, textLength);
  const last = str.slice(str.length - textLength, str.length);
  return `${first}...${last}`;
}
