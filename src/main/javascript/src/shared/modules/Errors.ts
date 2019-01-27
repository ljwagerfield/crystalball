// Errors that can be displayed to the user (directly from the error's message field).
// These errors should NOT be logged.
export class DisplayableError extends Error {
  constructor(message: string) {
    super(message);

    // Required by TypeScript when extending system types (like Error).
    Object.setPrototypeOf(this, DisplayableError.prototype);
  }
}

// Errors caused by external factors (i.e. through no fault of this codebase). These can be caused by:
// user's network dropping, our network dropping, 5** errors on our API, etc.
// These errors should NOT be logged.
export class InfrastructureError extends Error {
  innerError?: Error;

  constructor(message: string, innerError?: Error) {
    super(message);
    this.innerError = innerError;

    // Required by TypeScript when extending system types (like Error).
    Object.setPrototypeOf(this, InfrastructureError.prototype);
  }
}

// Indicates a problem with the SERVER so we class as infrastructural.
export class ApiServerError extends InfrastructureError {
  httpResponse: Response;

  constructor(message: string, httpResponse: Response) {
    super(message);
    this.httpResponse = httpResponse;

    // Required by TypeScript when extending system types (like Error).
    Object.setPrototypeOf(this, ApiServerError.prototype);
  }
}

// Indicates a problem with the CLIENT so we class as a bug (by intentionally not extending InfrastructureError).
export class ApiClientError extends Error {
  httpResponse: Response;

  constructor(message: string, httpResponse: Response) {
    super(message);
    this.httpResponse = httpResponse;

    // Required by TypeScript when extending system types (like Error).
    Object.setPrototypeOf(this, ApiClientError.prototype);
  }
}

export class NotFoundError extends ApiClientError {
  constructor(message: string, httpResponse: Response) {
    super(message, httpResponse);
    this.httpResponse = httpResponse;

    if (httpResponse.status !== 404)
      throw new Error("NotFoundError must be instantiated with a 404 HTTP response.");

    // Required by TypeScript when extending system types (like Error).
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class TokenExpiredError extends ApiClientError {

  constructor(httpResponse: Response) {
    super("Token has expired", httpResponse);

    // Required by TypeScript when extending system types (like Error).
    Object.setPrototypeOf(this, TokenExpiredError.prototype);
  }
}

/**
 * Bad state within the scope of the submitted payload.
 */
export class BadLocalStateError extends ApiClientError {
  constructor(message: string, httpResponse: Response) {
    super(message, httpResponse);
    this.httpResponse = httpResponse;

    if (httpResponse.status !== 422)
      throw new Error("BadLocalStateError must be instantiated with a 422 HTTP response.");

    // Required by TypeScript when extending system types (like Error).
    Object.setPrototypeOf(this, BadLocalStateError.prototype);
  }
}

/**
 * Bad state within the scope of the wider system (submitted payload is locally consistent).
 */
export class BadGlobalStateError extends ApiClientError {
  constructor(message: string, httpResponse: Response) {
    super(message, httpResponse);
    this.httpResponse = httpResponse;

    if (httpResponse.status !== 409)
      throw new Error("BadGlobalStateError must be instantiated with a 409 HTTP response.");

    // Required by TypeScript when extending system types (like Error).
    Object.setPrototypeOf(this, BadGlobalStateError.prototype);
  }
}

// Returns a displayable error message (and logs the error if appropriate).
export function handleError(error: any): string {
  const genericMessage = "An error occurred, please try again...";
  if (error instanceof DisplayableError)
    return error.message;
  if (error instanceof InfrastructureError) // Todo: Make this check subtypes too: http://stackoverflow.com/a/14486171
    return genericMessage;

  logErrorToBackend(error);

  return genericMessage;
}

export function logErrorToBackend(error: any): string {
  let developerMessage;
  if (error instanceof Error)
    developerMessage = error.stack;
  else
    developerMessage = `Unexpected error occurred (non-error object): ${error}`;

  // Todo: log this via our REST API (asynchronously) and do not log to console.
  // If we do want to log to console, move the console logging part into 'handleError'
  console.error(developerMessage);

  return developerMessage;
}