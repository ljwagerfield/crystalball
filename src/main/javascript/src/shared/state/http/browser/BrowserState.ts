export interface BrowserState {
  // True if there are previous pages that we have navigated away from using the History API.
  // False if we've just loaded the page from the server (and haven't yet performed any client-side navigation).
  canGoBack: boolean;

  scrolling: {
    previousScrollPosition?: number;
    restoredScrollPosition?: number;
  }

  currentRoute: {
    isLoading: boolean;
    displayableLoadError?: string;
  }
}

export const initialBrowserState: BrowserState = {
  canGoBack: false,
  scrolling: { },
  currentRoute: {
    isLoading: false,
  }
};