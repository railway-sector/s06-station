import "../index.css";
import "@esri/calcite-components/components/calcite-switch";
import { useEffect, useState } from "react";
import { ArcgisScene } from "@arcgis/map-components/dist/components/arcgis-scene";

function UndergroundSwitch() {
  const arcgisScene = document.querySelector("arcgis-scene") as ArcgisScene;
  const [underground, setUnderground] = useState<boolean>(false);

  useEffect(() => {
    if (arcgisScene?.map?.ground) {
      arcgisScene.map.ground.opacity = underground === true ? 0.7 : 1;
    }
  }, [underground]);

  return (
    <>
      <div
        className="groundSwitchDiv"
        style={{
          position: "fixed",
          zIndex: 10,
          bottom: 0,
          color: "white",
          borderWidth: 0.7,
          borderStyle: "solid",
          borderColor: "grey",
          backgroundColor: "#2b2b2b",
          paddingLeft: 5,
          paddingRight: 5,
          paddingTop: 4,
          paddingBottom: 4,
        }}
      >
        Ground: {""}
        On{" "}
        <calcite-switch
          oncalciteSwitchChange={(event: any) =>
            setUnderground(event.target.checked)
          }
        ></calcite-switch>{" "}
        Off
      </div>
    </>
  );
}

export default UndergroundSwitch;
