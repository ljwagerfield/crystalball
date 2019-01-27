import {CharSpecWithData} from "react-vega-lite";
import {load_Auto_Regression} from "shared/state/domains/charts/data/Auto_Regression";
export const chartData: CharSpecWithData[] = [];

// Todo index by name. I.e. chhartData[name] = data

chartData.push(load_Auto_Regression());