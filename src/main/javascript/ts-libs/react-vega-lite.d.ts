//
// Manually written.
//

declare module "react-vega-lite" {
  import * as React from "react";

  // Can be custom a custom object too: https://vega.github.io/vega-lite/docs/mark.html#mark-def
  export type MarkType = "bar" | "circle" | "square" | "tick" | "line" | "area" | "point" | "rule" | "geoshape" | "text"

  export interface CharSpecWithData {
    /**
     * Title for the plot.
     */
    title?: string;

    /**
     * Name of the visualization for later reference.
     */
    name?: string;

    /**
     * Description of this mark for commenting purpose.
     */
    description?: string;

    width: number;

    height: number;

    /**
     * An array of data transformations such as filter and new field calculation.
     */
    transform?: any[];

    /**
     * A string describing the mark type (one of `"bar"`, `"circle"`, `"square"`, `"tick"`, `"line"`,
     * `"area"`, `"point"`, `"rule"`, `"geoshape"`, and `"text"`) or a [mark definition object](https://vega.github.io/vega-lite/docs/mark.html#mark-def).
     */
    mark: MarkType;

    /**
     * A key-value mapping between encoding channels and definition of fields.
     */
    encoding?: any;

    /**
     * An object defining properties of geographic projection, which will be applied to `shape` path for `"geoshape"` marks
     * and to `latitude` and `"longitude"` channels for other marks.
     */
    projection?: any;

    /**
     * A key-value mapping between selection names and definitions.
     */
    selection?: {[name: string]: any};

    data: {
      values: any[]
    };
  }


  export interface VegaLiteProps  {
    spec: CharSpecWithData;
    data: any;
  }

  export class VegaLite extends React.Component<VegaLiteProps, {}> { }

  export default VegaLite;
}