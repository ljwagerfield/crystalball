import {RootState} from "shared/state/RootState";

export interface KeyValueState {
  [key: string]: any
}

// Selectors:

export function getKeyValue(state: RootState, key: string): any {
  return state.keyValue[key] as any;
}