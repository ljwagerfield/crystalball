export type KeyValueAction = {
  type: "SET_KEY_VALUE";
  key: string;
  value: any;
} | {
  type: "RESET_KEY";
  key: string;
}

export function setKeyValue(key: string, value: any): KeyValueAction {
  return {
    type: "SET_KEY_VALUE",
    key,
    value
  };
}

export function resetKey(key: string): KeyValueAction {
  return {
    type: "RESET_KEY",
    key
  };
}