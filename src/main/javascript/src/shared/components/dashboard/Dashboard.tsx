import * as React from "react";

import {ChartList} from "shared/components/chartlist/ChartList";
import {Chart} from "shared/components/chart/Chart";

import "./Dashboard.scss"

interface DashboardState {
  selectedChartNames: string[];
}

export class Dashboard extends React.Component<{}, DashboardState> {
  constructor(props: {}) {
    super(props);
    this.state = { selectedChartNames: [] };
  }

  setSelection(chartNames: string[]) {
    this.setState({ selectedChartNames: chartNames });
  }

  render() {
    const selection = this.state.selectedChartNames;
    const chartName = selection.length > 0 && selection[0];
    return (
      <div>
        <Chart selectedChartName={chartName} />
        <ChartList onSelectionChanged={e => this.setSelection(e)} selection={selection} />
      </div>
    );
  }
}