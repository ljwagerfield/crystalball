import * as React from "react";
import {chartData} from "shared/state/domains/charts/Data";
import "./ChartList.scss"

const chartNames = Object.keys(chartData);

interface ChartListProps {
  selection: string[];
  onSelectionChanged: (chartNames: string[]) => void;
}

export const ChartList = ({onSelectionChanged, selection}: ChartListProps) => (
  <div className="chart-list">
    {chartNames.map(chartName => (
      <a key={chartName}
         onClick={_ => onSelectionChanged([chartName])}
         className={selection.indexOf(chartName) != -1 ? "selected" : ""}>
        {chartName}
      </a>
    ))}
  </div>
);