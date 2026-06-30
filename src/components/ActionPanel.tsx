import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-list-item";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-action-bar";
import "@arcgis/map-components/components/arcgis-building-explorer";
import { useEffect, useState } from "react";
import "@arcgis/map-components/components/arcgis-basemap-gallery";
import "@arcgis/map-components/components/arcgis-layer-list";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-direct-line-measurement-3d";
import "@arcgis/map-components/components/arcgis-area-measurement-3d";
import { defineActions } from "../query";
import { buildingLayer } from "../layers";

function ActionPanel() {
  const [activeWidget, setActiveWidget] = useState<any>(null);
  const [nextWidget, setNextWidget] = useState<any>(null);

  const directLineMeasure = document.querySelector(
    "arcgis-direct-line-measurement-3d",
  );

  const arcgisBuildingExplorer = document.querySelector(
    "arcgis-building-explorer",
  );

  const shellPanel: any = document.getElementById("left-shell-panel");
  const [buildingLayerLoaded, setLotLayerLoaded] = useState<any>(null);

  useEffect(() => {
    buildingLayer.load().then(() => {
      setLotLayerLoaded(buildingLayer.loadStatus);
    });
  });

  useEffect(() => {
    if (buildingLayerLoaded === "loaded") {
      if (arcgisBuildingExplorer) {
        arcgisBuildingExplorer.layers = [buildingLayer];
      }
    }
  });

  useEffect(() => {
    if (activeWidget) {
      const actionActiveWidget: any = document.querySelector(
        `[data-panel-id=${activeWidget}]`,
      );
      actionActiveWidget.hidden = true;
      shellPanel.collapsed = true;

      directLineMeasure
        ? directLineMeasure.clear()
        : console.log("Line measure is cleared");
    }

    if (nextWidget !== activeWidget) {
      const actionNextWidget: any = document.querySelector(
        `[data-panel-id=${nextWidget}]`,
      );
      actionNextWidget.hidden = false;
      shellPanel.collapsed = false;
    }
  });

  return (
    <calcite-shell-panel
      slot="panel-start"
      id="left-shell-panel"
      displayMode="dock"
      collapsed
      style={{ "--calcite-shell-panel-background-color": "#2b2b2b" }}
    >
      <calcite-action-bar
        slot="action-bar"
        style={{
          borderStyle: "solid",
          borderRightWidth: 3.5,
          borderLeftWidth: 3.5,
          borderBottomWidth: 4.5,
          borderColor: "#555555",
        }}
      >
        <calcite-action
          data-action-id="layers"
          icon="layers"
          text="layers"
          id="layers"
          //textEnabled={true}
          onClick={(event: any) => {
            setNextWidget(event.target.id);
            setActiveWidget(nextWidget === activeWidget ? null : nextWidget);
          }}
        ></calcite-action>

        <calcite-action
          data-action-id="basemaps"
          icon="basemap"
          text="basemaps"
          id="basemaps"
          onClick={(event: any) => {
            setNextWidget(event.target.id);
            setActiveWidget(nextWidget === activeWidget ? null : nextWidget);
          }}
        ></calcite-action>

        <calcite-action
          data-action-id="buildingexplorer"
          icon="organization"
          text="Building Explorer"
          id="buildingexplorer"
          onClick={(event: any) => {
            setNextWidget(event.target.id);
            setActiveWidget(nextWidget === activeWidget ? null : nextWidget);
          }}
        ></calcite-action>

        <calcite-action
          data-action-id="directline-measure"
          icon="measure-line"
          text="Line Measurement"
          id="directline-measure"
          onClick={(event: any) => {
            setNextWidget(event.target.id);
            setActiveWidget(nextWidget === activeWidget ? null : nextWidget);
          }}
        ></calcite-action>

        <calcite-action
          data-action-id="information"
          icon="information"
          text="Information"
          id="information"
          onClick={(event: any) => {
            setNextWidget(event.target.id);
            setActiveWidget(nextWidget === activeWidget ? null : nextWidget);
          }}
        ></calcite-action>
      </calcite-action-bar>

      <calcite-panel heading="Layers" data-panel-id="layers" hidden>
        <arcgis-layer-list
          referenceElement="arcgis-scene"
          selectionMode="multiple"
          visibilityAppearance="checkbox"
          filter-placeholder="Filter layers"
          listItemCreatedFunction={defineActions}
        ></arcgis-layer-list>
      </calcite-panel>

      <calcite-panel heading="Basemaps" data-panel-id="basemaps" hidden>
        <arcgis-basemap-gallery referenceElement="arcgis-scene"></arcgis-basemap-gallery>
      </calcite-panel>

      <calcite-panel
        heading="Building Explorer"
        data-panel-id="buildingexplorer"
        hidden
      >
        <arcgis-building-explorer referenceElement="arcgis-scene"></arcgis-building-explorer>
      </calcite-panel>

      <calcite-panel data-panel-id="directline-measure" hidden>
        <arcgis-direct-line-measurement-3d
          id="directLineMeasurementAnalysisButton"
          referenceElement="arcgis-scene"
        ></arcgis-direct-line-measurement-3d>
      </calcite-panel>

      <calcite-panel heading="Description" data-panel-id="information" hidden>
        {nextWidget === "information" ? (
          <div style={{ paddingLeft: "20px" }}>
            This smart map shows the construction progress on structural
            components of station buildings:
            <ul>
              <li>Structural Foundation, </li>
              <li>Structural Column, </li>
              <li>Structural Framing, </li>
              <li>Floors, </li>
              <li>Walls, </li>
              <li>Others </li>
            </ul>
            <div style={{ paddingLeft: "20px" }}>
              <li>
                The source of data: <b>BIM models.</b>
              </li>
              <li>
                {" "}
                The Contractors update construction progress directly in the BIM
                models. The GIS Team uses the BIM models for updating smart
                maps.
              </li>
            </div>
          </div>
        ) : (
          <div className="informationDiv" hidden></div>
        )}
      </calcite-panel>
    </calcite-shell-panel>
  );
}

export default ActionPanel;
