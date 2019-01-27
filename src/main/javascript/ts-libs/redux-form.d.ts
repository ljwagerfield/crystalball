import * as _ from "redux-form"; // Required for module augmentation.

declare module "redux-form" {
  export interface FieldProps {
    input: FieldInputProps;
    meta: FieldMetaProps
  }
  export interface FieldInputProps {
    // Incomplete! Please see: http://redux-form.com/6.6.3/docs/api/Field.md/#props
    name: string;
    checked?: boolean;
    value: any;
  }
  export interface FieldMetaProps {
    active: boolean;
    autofilled: boolean;
    asyncValidating: boolean;
    dirty: boolean;
    dispatch: Function;
    error?: string;
    form: string;
    invalid: boolean;
    pristine: boolean;
    submitting: boolean;
    submitFailed: boolean;
    touched: boolean;
    valid: boolean;
    visited: boolean;
    warning?: string;
  }
}