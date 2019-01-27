import {Dispatch} from "redux";
import Promise from "bluebird";
import {RootState} from "shared/state/RootState";

export type ThunkAction<T>      = (dispatch: Dispatch<any>, getState: () => RootState) => T
export type AsyncThunkAction<T> = (dispatch: Dispatch<any>, getState: () => RootState) => Promise<T>
