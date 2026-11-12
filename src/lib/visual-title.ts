/** Same splits the service titles already use, so the visible lines stay put. */
export function visualTitleLines(label: string, delimiters: readonly string[] = [' / ', ' & ', ' ']) {
  for (const separator of delimiters) {
    if (separator && label.includes(separator)) {
      return { lines: label.split(separator), separator }
    }
  }
  return { lines: [label], separator: '' }
}
