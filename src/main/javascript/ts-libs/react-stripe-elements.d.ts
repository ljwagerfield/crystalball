//
// Modified from original due to <Elements> lacking correct property signature.
//

declare module "react-stripe-elements" {

  // Type definitions for react-stripe-elements 1.0
  // Project: https://github.com/stripe/react-stripe-elements#readme
  // Definitions by: dan-j <https://github.com/dan-j>
  // Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
  // TypeScript Version: 2.3

  /// <reference types="stripe-v3" />
  import * as React from 'react';

  export namespace ReactStripeElements {
    import ElementChangeResponse = stripe.elements.ElementChangeResponse;
    import ElementsOptions = stripe.elements.ElementsOptions;
    import TokenOptions = stripe.TokenOptions;
    import TokenResponse = stripe.TokenResponse;

    /**
     * There's a bug in @types/stripe which defines the property as
     * `declined_code` (with a 'd') but it's in fact `decline_code`
     */
    type PatchedTokenResponse = TokenResponse & {
      error?: { decline_code?: string };
    };

    interface StripeProviderProps {
      apiKey: string;
    }

    interface StripeProps {
      createToken(options?: TokenOptions): Promise<PatchedTokenResponse>;
      createSource(options: SourceOptions): Promise<SourceResponse>;
      retrieveSource(options: { id: string, client_secret: string }): Promise<SourceResponse>;
    }

    interface SourceOptions {
      type: 'card' | 'three_d_secure';
      flow?: 'redirect' | 'receiver' | 'code_verification' | 'none';
      sepa_debit?: {
        iban: string;
      };
      currency?: string;
      amount?: number;
      owner?: {
        address?: {
          city?: string;
          country?: string;
          line1?: string;
          line2?: string;
          postal_code?: string;
          state?: string;
        };
        name?: string;
        email?: string;
        phone?: string;
      };
      metadata?: {};
      statement_descriptor?: string;
      redirect?: {
        return_url: string;
      };
      token?: string;
      usage?: 'reusable' | 'single_use';
      three_d_secure?: {
        card: string;
      }
    }

    interface Source {
      client_secret: string;
      created: number;
      currency: string;
      id: string;
      owner: {
        address: string | null;
        email: string | null;
        name: string | null;
        phone: string | null;
        verified_address: string | null;
        verified_email: string | null;
        verified_name: string | null;
        verified_phone: string | null;
      };
      sepa_debit?: {
        bank_code: string | null;
        country: string | null;
        fingerprint: string;
        last4: string;
        mandate_reference: string;
      };
      card?: Card;
      three_d_secure?: {
        card: string, // Source ID of underlying card.
        customer?: string,
        authenticated: boolean
      }
      status: "canceled" | "chargeable" | "consumed" | "failed" | "pending";
      redirect?: {
        failure_reason?: "user_abort" | "declined" | "processing_error" | "failed";
        return_url: string;
        status: "pending" | "succeeded" | "not_required" | "failed";
        url: string;
      }
    }

    interface SourceResponse {
      source?: Source;
      error?: Error;
    }

    interface Card {
      id: string;
      object: string;
      address_city?: string;
      address_country?: string;
      address_line1?: string;
      address_line1_check?: stripe.checkType;
      address_line2?: string;
      address_state?: string;
      address_zip?: string;
      address_zip_check?: stripe.checkType;
      brand: stripe.brandType;
      country: string;
      currency?: string;
      cvc_check?: stripe.checkType;
      dynamic_last4: string;
      exp_month: number;
      exp_year: number;
      fingerprint: string;
      funding: stripe.fundingType;
      last4: string;
      metadata: any;
      name?: string;
      tokenization_method?: stripe.tokenizationType;
      three_d_secure?: "not_supported" | "optional" | "required";
    }

    interface InjectOptions {
      withRef?: boolean;
    }

    interface InjectedStripeProps {
      stripe: StripeProps;
    }

    interface ElementProps extends ElementsOptions {
      className?: string;

      elementRef?(element: ElementObject): void;

      onChange?(event: ElementChangeResponse): void;

      onBlur?(event: ElementChangeResponse): void;

      onFocus?(event: ElementChangeResponse): void;

      onReady?(): void;
    }

    interface ElementObject {
      blur(): void;
      clear(): void;
      focus(): void;
    }
  }

  export class StripeProvider extends React.Component<ReactStripeElements.StripeProviderProps> {
  }

  export class Elements extends React.Component<ReactStripeElements.ElementOptions> {
  }

  export function injectStripe<P extends object>(
    WrappedComponent: React.ComponentType<P & ReactStripeElements.InjectedStripeProps>,
    componentOptions?: ReactStripeElements.InjectOptions): React.ComponentType<P>;

  export class CardElement extends React.Component<ReactStripeElements.ElementProps> {
  }

  export class CardNumberElement extends React.Component<ReactStripeElements.ElementProps> {
  }

  export class CardExpiryElement extends React.Component<ReactStripeElements.ElementProps> {
  }

  export class CardCVCElement extends React.Component<ReactStripeElements.ElementProps> {
  }

  export class PostalCodeElement extends React.Component<ReactStripeElements.ElementProps> {
  }

}