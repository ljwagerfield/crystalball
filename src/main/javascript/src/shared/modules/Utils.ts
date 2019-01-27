export function returnIfString(value: any): string | null {
  return typeof value == "string" ? value : null;
}

export function returnIfNumber(value: any): number | null {
  const valueNum = parseInt(value);
  return !isNaN(valueNum) ? valueNum : null;
}

export function returnAsStringArray(value: null | string | string[]): string[] | null {
  if (!value) {
    return null;
  }
  if (typeof value == "string") {
    return [value];
  }

  return value;
}

export function removeEmptyProperties<A extends object>(obj: A): A {
  const propNames = Object.getOwnPropertyNames(obj);
  const objAny = obj as any;
  for (let i = 0; i < propNames.length; i++) {
    let propName = propNames[i];
    if (objAny[propName] === null || objAny[propName] === undefined) {
      delete objAny[propName];
    }
  }

  return obj;
}

export function toUrlSegment(title: string): string {
  return title.toLowerCase().replace(/ /g, "-");
}

export function getCurrentYear(): string {
  return new Date().getFullYear().toString()
}