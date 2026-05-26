import { useState, use } from "react";
import "../index.css";
import "@esri/calcite-components/dist/components/calcite-segmented-control";
import "@esri/calcite-components/dist/components/calcite-segmented-control-item";
import { MyContext } from "../contexts/MyContext";
import { station_names } from "../uniqueValues";

export default function StationSegmentedList() {
  const { updateStations } = use(MyContext);
  const [stationSelected, setStationSelected] = useState<string>(
    station_names[0],
  );

  return (
    <>
      <calcite-segmented-control
        oncalciteSegmentedControlChange={(event: any) => {
          setStationSelected(event.target.selectedItem.id);
          updateStations(event.target.selectedItem.id);
        }}
        scale="m"
        width="full"
        style={{ marginTop: "10px" }}
      >
        {stationSelected &&
          station_names.map((station: any, index: any) => {
            return (
              <calcite-segmented-control-item
                {...(stationSelected === station ? { checked: true } : {})}
                key={index}
                value={station}
                id={station}
              >
                {station}
              </calcite-segmented-control-item>
            );
          })}
      </calcite-segmented-control>
    </>
  );
}
