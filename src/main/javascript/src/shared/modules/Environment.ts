function getIsProduction(): boolean {
  if (process && process.env) {
    return process.env.NODE_ENV === 'production';
  }
  else {
    const windowAny = window as any;
    return windowAny && windowAny['__IS_PRODUCTION__'];
  }
}

export const isProduction = getIsProduction();