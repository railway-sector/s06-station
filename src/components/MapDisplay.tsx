import "../index.css";
import "@arcgis/map-components/dist/components/arcgis-scene";
import "@arcgis/map-components/components/arcgis-scene";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-basemap-gallery";
import "@arcgis/map-components/components/arcgis-layer-list";
import "@arcgis/map-components/components/arcgis-expand";
import "@arcgis/map-components/components/arcgis-compass";
import {
  alignmentGroupLayer,
  buildingLayer,
  prowLayer,
  stationLayer,
} from "../layers";
import "@esri/calcite-components/dist/components/calcite-button";
import type { ArcgisScene } from "@arcgis/map-components/dist/components/arcgis-scene";
import { useState } from "react";

function MapDisplay() {
  const arcgisScene = document.querySelector("arcgis-scene") as ArcgisScene;
  const [_mapView, setMapView] = useState<any>();

  arcgisScene?.viewOnReady(() => {
    arcgisScene?.map?.add(prowLayer);
    arcgisScene?.map?.add(buildingLayer);
    arcgisScene?.map?.add(alignmentGroupLayer);
    arcgisScene?.map?.add(stationLayer);
    arcgisScene.view.environment.atmosphereEnabled = false;
    arcgisScene.view.environment.starsEnabled = false;
    arcgisScene.hideAttribution = true;

    if (arcgisScene?.map?.ground) {
      arcgisScene.map.ground.navigationConstraint = { type: "none" };
      arcgisScene.map.ground.opacity = 0.7;
    }
  });
  return (
    <arcgis-scene
      // item-id="5ba14f5a7db34710897da0ce2d46d55f"
      basemap="dark-gray-vector"
      ground="world-elevation"
      viewingMode="local"
      zoom={18}
      center="121.1302399, 14.2695320"
      onarcgisViewReadyChange={(event: any) => {
        setMapView(event.target.id);
      }}
    >
      <arcgis-compass slot="top-right"></arcgis-compass>
      <arcgis-zoom slot="bottom-right"></arcgis-zoom>
    </arcgis-scene>
  );
}

export default MapDisplay;
