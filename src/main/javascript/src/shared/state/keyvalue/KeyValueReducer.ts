import {KeyValueState} from "shared/state/keyvalue/KeyValueState";
import {KeyValueAction} from "shared/state/keyvalue/KeyValueActions";

export default function keyValue(oldState: KeyValueState = {}, action: KeyValueAction): KeyValueState {
  let newState;

  switch (action.type) {

    case "SET_KEY_VALUE":
      newState = {...oldState};
      newState[action.key] = action.value;
      return newState;

    case "RESET_KEY":
      newState = {...oldState};
      delete newState[action.key];
      return newState;

    default:
      return oldState;
  }
}