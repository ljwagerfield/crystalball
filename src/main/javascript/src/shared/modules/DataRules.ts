import isEmail from "sane-email-validation";

export const emailRules = {
  maxLength: 100,
  validate: (value: string) => {
    return isEmail(value) ? null : "Email is invalid";
  }
};

export const usernameRules = {
  maxLength: 30,
  validate: (value: string) => {
    if (!/^[a-zA-Z0-9 '\\-]+$/.test(value)) {
      return "Usernames can only contain: numbers, letters, spaces, hyphens and apostrophes."
    }
    return null;
  }
};

export const passwordRules = {
  maxLength: 100,
  minLength: 8,
  validate: (value: string) => {
    const min = passwordRules.minLength;
    return value.length >= min ? null : `Password requires ${min} characters or more`;
  }
};