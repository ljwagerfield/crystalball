import * as React from "react";
import Promise from "bluebird";
import {FieldProps, FieldInputProps, FormProps as ReduxFormProps} from "redux-form";
import withRouter from "shared/components/common/decorators/WithRouter";
import {changeRoute, ChangeRoute} from "shared/modules/routing/RoutingUtils";
import {ReactNode, SyntheticEvent} from "react";
import {Link} from "react-router-dom";
import {emailRules, passwordRules, usernameRules} from "shared/modules/DataRules";
import {Dispatch} from "redux";
import {handleError, logErrorToBackend} from "shared/modules/Errors";
import {ErrorBox} from "shared/components/common/error/ErrorBox";

// ----------
// Interfaces
// ----------

export interface OnSubmitArg {
  changeRoute: ChangeRoute;
  formProps: ReduxFormProps<{}, {}, {}>;
  component: React.Component<{}, {}>;
}

export interface BaseFieldProps extends FieldProps {
  eagerErrors?: string[];
}

export interface StandardFieldProps extends BaseFieldProps {
  // These are props which you apply directly to <Field xyz=...> but some seem to be intercepted by ReduxForm.
  // If you want a direct way to add fields to the underlying <input xyz=...> then use inputProps (e.g. 'onKeyDown', etc.)
  input: FieldInputProps;
  inputProps: { // There are other properties... we just include some common ones here.
    type: string;
    autoFocus?: boolean;
    maxLength?: number;
  }
  className?: string;
  label?: string;
  large?: boolean;
  placeholder?: string;
  hint?: string;
  labelLinkUrl?: string;
  labelLinkText?: string;
  children?: any;
}

interface SubmitButtonProps {
  idleText: string;
  large?: boolean;
  pendingText: string;
  successText: string;
  className: string;
  disabled?: boolean;
  reduxForm: ReduxFormProps<{}, {}, {}>;
}

export interface FormSubmitProps<T> {
  onSubmit: (arg: OnSubmitArg) => (data: T) => Promise<void>;
}

interface FormComponentProps {
  propagateOnSubmitArgs?: (arg: OnSubmitArg) => void;
  propagateOnSubmit?: (submit: () => void) => void;
  formProps: ReduxFormProps<{}, {}, {}> & FormSubmitProps<any>;
  component?: React.Component<{}, {}>;
  className?: string;
  children?: ReactNode;
}

// ---------------
// Utility Methods
// ---------------

export function moveCaretToEnd(event: SyntheticEvent<HTMLInputElement>): void {
  const temp_value = event.currentTarget.value;
  event.currentTarget.value = "";
  event.currentTarget.value = temp_value;
}

// Workaround due to ReduxForm reinitializing its own state after DESTROY.
// See: https://github.com/erikras/redux-form/issues/1778
export function reduxFormReset(arg: OnSubmitArg): () => void {
  return () => {
    setTimeout(arg.formProps.reset, 0);
  };
}

export function assertPropertyValuesMatchKeys(object: any): void {
  for (let property in object) {
    if (object.hasOwnProperty(property) && object[property] != property) {
      logErrorToBackend(new Error("Object property values do not match keys: " + JSON.stringify(property)));
    }
  }
}

// Workaround due to lack of field-level 'asyncValidate' prop.
// See: https://github.com/erikras/redux-form/issues/980#issuecomment-307065387
export function asyncValidate(fieldLevelAsyncValidation: any): (values: any, _dispatch: Dispatch<any>, props: FormComponentProps, fieldName: string) => Promise<{}> {
  return (values: any, _dispatch: Dispatch<any>, props: FormComponentProps, fieldName: string) => {
    const previousErrors = (props as any).asyncErrors;

    if (fieldLevelAsyncValidation.hasOwnProperty(fieldName)) {
      return fieldLevelAsyncValidation[fieldName](values[fieldName])
        .then((error: string) => {
          const newErrors = {...previousErrors};
          if (error == null) {
            delete newErrors[fieldName]
          }
          else {
            newErrors[fieldName] = error;
          }
          return newErrors;
        })
        .catch((e: any) => {
          handleError(e); // Throw away error at this point (bad UX to display infrastructure errors ahead of submitting).
          return previousErrors;
        });
    }

    return Promise.resolve(previousErrors);
  };
}

// ----------------
// Validation Rules
// ----------------

export const V = {
  required: (label: string) => (value: string) => (value ? null : `${label} required`),
  min:      (min: number, error: string) => (value: string) => (parseInt(value, 10) >= min ? null : error),
  username: usernameRules.validate,
  email:    emailRules.validate,
  password: passwordRules.validate,
};

// ----------
// Components
// ----------

export function fieldHasError(props: BaseFieldProps): boolean {
  return (props.meta.submitFailed && props.meta.error != null) ||
    (props.eagerErrors && props.eagerErrors.includes(props.meta.error));
}

export const standardSelect = (props : StandardFieldProps) => (
  <div className={`form-group ${props.large ? "form-group-lg" : ""} ${fieldHasError(props) ? "has-error" : ""} ${props.className}`}>
    <div className="select">
      {/*
        * The ...props.input is required to get 'defaultValue' etc. working properly...
        * Be sure to test on the checkout page's 'country' field before making changes here!
        */}
      <select id={props.input.name} {...props.input as any}>
        {props.children}
      </select>
    </div>
    {props.hint && !fieldHasError(props) &&
      <small className="help-block">{props.hint}</small>
    }
    {fieldHasError(props) && <span className="help-block">{props.meta.error}</span>}
  </div>
);

export const standardField = (props : StandardFieldProps) => (
  <div className={`form-group ${props.large ? "form-group-lg" : ""} ${fieldHasError(props) ? "has-error" : ""} ${props.className}`}>
    {props.label &&
      <label htmlFor={props.input.name} className="control-label">
        {props.label}
        {props.labelLinkText && <Link to={props.labelLinkUrl} className="label-link" tabIndex={1000}>{props.labelLinkText}</Link>}
      </label>
    }
    <div className={props.meta.asyncValidating ? "form-control-validating with-icon" : ""}>
      <input {...props.input}
             {...props.inputProps}
             id={props.input.name}
             className="form-control" />
    </div>
    {props.hint && !fieldHasError(props) &&
      <small className="help-block">{props.hint}</small>
    }
    {fieldHasError(props) && <span className="help-block">{props.meta.error}</span>}
  </div>
);

export const SubmitButton = ({idleText, pendingText, successText, large, className, reduxForm, disabled}: SubmitButtonProps) =>
  <button className={`btn ${large ? "btn-lg" : ""} ${className || ""} with-icon`} type="submit" disabled={disabled}>
    {reduxForm.submitting ? pendingText : (reduxForm.submitSucceeded ? successText : idleText)}
  </button>;

class FormInner extends React.Component<FormComponentProps, {}> {
  onSubmitArg: OnSubmitArg;

  componentWillMount() {
    this.onSubmitArg = {
      changeRoute: changeRoute(this.context),
      formProps: this.props.formProps,
      component: this.props.component
    };

    if (this.props.propagateOnSubmitArgs) {
      this.props.propagateOnSubmitArgs(this.onSubmitArg);
    }

    if (this.props.propagateOnSubmit) {
      this.props.propagateOnSubmit(() => this.submitDelayed());
    }
  }

  submitter() {
    const formProps = this.props.formProps;
    return formProps.handleSubmit(formProps.onSubmit(this.onSubmitArg))
  }

  // Delayed submit, to allow things like redux "dispatch(change(formName, fieldName, fieldValue))" to process.
  submitDelayed() {
    const submitter = this.submitter();
    setTimeout(submitter, 50);
  }

  render() {
    const {formProps, className, children} = this.props;
    return (
      <form onSubmit={this.submitter()}
            className={`${className == null ? "" : className} ${formProps.submitting ? "form-pending" : formProps.submitSucceeded ? "form-succeeded" : "form-idle"}`}
            noValidate ref="form">

        <fieldset disabled={formProps.submitting || formProps.submitSucceeded }>

          {children}

          {formProps.submitFailed && formProps.error &&
            <ErrorBox>{formProps.error}</ErrorBox>
          }

        </fieldset>
      </form>
    );
  }
}

export const Form = withRouter(FormInner);