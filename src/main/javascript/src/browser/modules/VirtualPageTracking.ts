let isInitialPageLoad = true;

export function trackRouteChange(newPath: string): void {
  // We already track visits on page load using the standard GA mechanism (i.e. code in footer)... so we
  // only want to track subsequent page changes here (and not the initial page load, as this is already being
  // tracked). We do this to ensure we track visits from users with old browsers that may not get this far...
  if (isInitialPageLoad) {
    isInitialPageLoad = false;
    return;
  }

  const ga = (window as any).ga;

  if (ga) { // GA is only enabled in production.
    ga('set', 'page', newPath);
    ga('send', 'pageview');
  }
}