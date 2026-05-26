import { createContext } from "react";

type MyDropdownContextType = {
  stations: any;
  chartPanelwidth: any;
  updateStations: any;
  updateChartPanelwidth: any;
};

const initialState = {
  stations: undefined,
  chartPanelwidth: undefined,
  updateStations: undefined,
  updateChartPanelwidth: undefined,
};

export const MyContext = createContext<MyDropdownContextType>({
  ...initialState,
});
