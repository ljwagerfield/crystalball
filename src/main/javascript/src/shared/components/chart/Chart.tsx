import * as React from "react";
import VegaLite from "react-vega-lite";
import {chartData} from "shared/state/domains/charts/Index";
import "./Chart.scss"

interface ChartProps {
  selectedChartName?: string;
}

export const Chart = ({selectedChartName}: ChartProps) => {

  return (
    <div className="chart">
      {selectedChartName && <VegaLite spec={(chartData as any)[selectedChartName]} data={(chartData as any)[selectedChartName].data} />}
      {!selectedChartName && <p>No chart selected</p>}
    </div>
  );
};