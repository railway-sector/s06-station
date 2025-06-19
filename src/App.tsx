import React, { createContext, useState } from "react";
import "./App.css";
import "./index.css";
import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-legend";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/calcite/calcite.css";
import { CalciteShell } from "@esri/calcite-components-react";
import MapDisplay from "./components/MapDisplay";
import ActionPanel from "./components/ActionPanel";
import Header from "./components/Header";
import MainChart from "./components/MainChart";
import { station_names } from "./Query";
import UndergroundSwitch from "./components/UndergroundSwitch";

type MyDropdownContextType = {
  stations: any;
  updateStations: any;
};

const initialState = {
  stations: undefined,
  updateStations: undefined,
};

export const MyContext = createContext<MyDropdownContextType>({
  ...initialState,
});

function App() {
  const [stations, setStations] = useState<any>(station_names[0]);

  const updateStations = (newStation: any) => {
    setStations(newStation);
  };

  return (
    <div>
      <CalciteShell>
        <MyContext
          value={{
            stations,
            updateStations,
          }}
        >
          <ActionPanel />
          <UndergroundSwitch />
          <MapDisplay />
          <MainChart />
          <Header />
        </MyContext>
      </CalciteShell>
    </div>
  );
}

export default App;
