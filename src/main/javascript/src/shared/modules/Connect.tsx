//
// Modified `connect` method to support our TRoute components.
//
// It automatically passes the `match` property from a matching ancestor `TRoute` component into the connected component,
// and updates the component if this `match` changes.
//
// Without this adapter, the restrictive `shouldComponentUpdate` function inside the standard `connect` will block all
// updates to the `tMatch` context made by the `TMatchProvider` from being passed into the composed component (i.e. if
// `isMatch` or `lastMatchedLocation` changes in the `TMatchProvider`, a descendant component wrapped with the standard
// `connect` will not see the update, due to `connect` having a restrictive `shouldComponentUpdate` that basically
// performs a diff on the generated `props` from `mapStateToProps`).
//
// See: https://github.com/facebook/react/issues/2517
//
import {
  ComponentDecorator, connect as reduxConnect, InferableComponentDecorator, MapDispatchToPropsParam,
  MapStateToPropsParam,
  MergeProps, Options
} from "react-redux";
import {withMatch} from "shared/modules/routing/TMatch";

export function connect<TOwnProps>(): InferableComponentDecorator<TOwnProps>;

export function connect<TStateProps, no_dispatch, TOwnProps>(
  mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps>
): ComponentDecorator<TOwnProps, TStateProps & TOwnProps>;

export function connect<no_state, TDispatchProps, TOwnProps>(
  mapStateToProps: null | undefined,
  mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>
): ComponentDecorator<TOwnProps, TDispatchProps & TOwnProps>;

export function connect<TStateProps, TDispatchProps, TOwnProps>(
  mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps>,
  mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>
): ComponentDecorator<TOwnProps, TStateProps & TDispatchProps & TOwnProps>;

export function connect<TStateProps, no_dispatch, TOwnProps, TMergedProps>(
  mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps>,
  mapDispatchToProps: null | undefined,
  mergeProps: MergeProps<TStateProps, undefined, TOwnProps, TMergedProps>,
): ComponentDecorator<TOwnProps, TMergedProps>;

export function connect<no_state, TDispatchProps, TOwnProps, TMergedProps>(
  mapStateToProps: null | undefined,
  mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
  mergeProps: MergeProps<undefined, TDispatchProps, TOwnProps, TMergedProps>,
): ComponentDecorator<TOwnProps, TMergedProps>;

export function connect<no_state, no_dispatch, TOwnProps, TMergedProps>(
  mapStateToProps: null | undefined,
  mapDispatchToProps: null | undefined,
  mergeProps: MergeProps<undefined, undefined, TOwnProps, TMergedProps>,
): ComponentDecorator<TOwnProps, TMergedProps>;

export function connect<TStateProps, TDispatchProps, TOwnProps, TMergedProps>(
  mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps>,
  mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
  mergeProps: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>,
): ComponentDecorator<TOwnProps, TMergedProps>;

export function connect<TStateProps, no_dispatch, TOwnProps>(
  mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps>,
  mapDispatchToProps: null | undefined,
  mergeProps: null | undefined,
  options: Options
): ComponentDecorator<TOwnProps, TStateProps & TOwnProps>;

export function connect<no_state, TDispatchProps, TOwnProps>(
  mapStateToProps: null | undefined,
  mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
  mergeProps: null | undefined,
  options: Options
): ComponentDecorator<TOwnProps, TDispatchProps & TOwnProps>;

export function connect<TStateProps, TDispatchProps, TOwnProps>(
  mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps>,
  mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
  mergeProps: null | undefined,
  options: Options
): ComponentDecorator<TOwnProps, TStateProps & TDispatchProps & TOwnProps>;

export function connect<TStateProps, TDispatchProps, TOwnProps, TMergedProps>(
  mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps>,
  mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
  mergeProps: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>,
  options: Options
): ComponentDecorator<TOwnProps, TMergedProps>;

export function connect(mapStateToProps?: any, mapDispatchToProps?: any, mergeProps?: any, options?: any) {
  return (c: any) => withMatch(reduxConnect(mapStateToProps, mapDispatchToProps, mergeProps, options)(c));
}