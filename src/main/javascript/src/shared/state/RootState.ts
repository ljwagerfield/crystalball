import {combineReducers} from 'redux'
import {FormStateMap, reducer as form} from 'redux-form'
import {http, HttpState} from "shared/state/http/HttpState";
import {domains, DomainState} from "shared/state/domains/DomainState";
import {KeyValueState} from "shared/state/keyvalue/KeyValueState";
import keyValue from "shared/state/keyvalue/KeyValueReducer";

export interface RootState {
  domains: DomainState;
  http: HttpState;
  keyValue: KeyValueState;
  form: FormStateMap;
}

export const root = combineReducers<RootState>({
  domains,
  http,
  keyValue,
  form
});