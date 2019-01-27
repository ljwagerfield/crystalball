const oneHour         = 60 * 60;
const oneDay          = 24 * oneHour;
const timeDriftLeeway = oneHour; // Possible time drift between server and client, so client state expires before server state.

// Allows us to identify all cookies pertaining to a signed-in session (e.g. to make wiping the session easier).
export const sessionCookiePrefix = "lg-";

export const cookieRegistry = {
  sessionJwt: {
    name: `${sessionCookiePrefix}jwt`,
    age:  (30 * oneDay) - timeDriftLeeway // See `Token.userSessionLengthInDays` in API.
  },
  pendingEmailAddress: {
    name: `${sessionCookiePrefix}pending-email`,
    age:  (10 * oneDay) - timeDriftLeeway  // See `AppConfig.unconfirmedAccountLifetime` in API.
  },
  checkoutForm: {
    name: `${sessionCookiePrefix}checkout-form`,
    age:  oneDay - timeDriftLeeway // See `Token.userSessionLengthInDays` in API.
  }
};