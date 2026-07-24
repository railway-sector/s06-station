import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import BuildingSceneLayer from "@arcgis/core/layers/BuildingSceneLayer";
import {
  b_renderer,
  chainage_renderer,
  label_chainage,
  label_stationp,
  norender,
  pier_access_label,
  popup,
  portalItems,
  prow_renderer,
} from "./uniqueValues";

//---------------------------------------------//
//              Other Layers                   //
//---------------------------------------------//
export const dateTable = new FeatureLayer({
  portalItem: portalItems("b2a118b088a44fa0a7a84acbe0844cb2"),
});

//---------------------------------------------//
//          Alignment Layers                   //
//---------------------------------------------//
//--- CHAINAGE LAYER ---//
export const chainageLayer = new FeatureLayer({
  portalItem: portalItems("e09b9af286204939a32df019403ef438"),
  layerId: 2,
  title: "Chainage",
  elevationInfo: { mode: "relative-to-ground" },
  labelingInfo: [label_chainage],
  minScale: 150000,
  maxScale: 0,
  renderer: chainage_renderer,
  popupEnabled: false,
});

//--- PIER NUMBER POINT LAYER ---//
export const pierNoLayer = new FeatureLayer({
  url: "https://gis.railway-sector.com/server/rest/services/SC_Alignment/FeatureServer/3",
  labelingInfo: [pier_access_label],
  elevationInfo: { mode: "on-the-ground" },
  title: "Pier No",
  popupEnabled: false,
});

//--- PROW LAYER ---//
export const prowLayer = new FeatureLayer({
  url: "https://gis.railway-sector.com/server/rest/services/SC_Alignment/FeatureServer/5",
  layerId: 5,
  title: "PROW",
  renderer: prow_renderer,
  popupEnabled: false,
});

//--- STATION POINT LAYER ---//
export const stationLayer = new FeatureLayer({
  portalItem: portalItems("e09b9af286204939a32df019403ef438"),
  layerId: 6,
  title: "Station",
  labelingInfo: [label_stationp],
  elevationInfo: { mode: "relative-to-ground" },
});
stationLayer.listMode = "hide";

export const alignmentGroupLayer = new GroupLayer({
  title: "Alignment",
  visible: true,
  visibilityMode: "independent",
  layers: [chainageLayer, pierNoLayer, prowLayer], //stationLayer,
});

//---------------------------------------------//
//            Building Scene Layers            //
//---------------------------------------------//
export const buildingLayer = new BuildingSceneLayer({
  portalItem: portalItems("8af94d0ef9894a1483651714e37a8317"),
  title: "Station Structure",
  legendEnabled: false,
});

//--- ARCHITECTURAL
export let floorsLayer: null | any;
export let wallsLayer: null | any;
export let roomsLayer: null | any;
export let specialtyEquipmentLayer: null | any;

//--- STRUCTURAL
export let stFramingLayer: null | any;
export let stColumnLayer: null | any;
export let stFoundationLayer: null | any;
export let exteriorShellLayer: null | any;
export let sublayersAll: null | any = [];

buildingLayer.when(() => {
  buildingLayer.allSublayers.forEach((layer: any) => {
    switch (layer.modelName) {
      case "FullModel":
        layer.visible = true;
        break;

      case "Overview":
        exteriorShellLayer = layer;
        exteriorShellLayer.visible = false;
        exteriorShellLayer.title = "Exterior Shell";
        break;

      case "Floors":
        floorsLayer = layer;
        floorsLayer.popupTemplate = popup;
        floorsLayer.title = "Floors";
        floorsLayer.renderer = b_renderer;
        sublayersAll.push({ name: layer.modelName, layer: layer });
        break;

      case "Walls":
        wallsLayer = layer;
        wallsLayer.popupTemplate = popup;
        wallsLayer.title = "Walls";
        wallsLayer.renderer = b_renderer;
        sublayersAll.push({ name: layer.modelName, layer: layer });
        break;

      case "Rooms":
        roomsLayer = layer;
        roomsLayer.popupTemplate = popup;
        roomsLayer.title = "Rooms (Not Monitored)";
        roomsLayer.renderer = norender;
        break;

      case "SpecialtyEquipment":
        specialtyEquipmentLayer = layer;
        specialtyEquipmentLayer.popupTemplate = popup;
        specialtyEquipmentLayer.title = "Specialty Equipment (Not Monitored)";
        specialtyEquipmentLayer.renderer = norender;
        break;

      case "StructuralFraming":
        stFramingLayer = layer;
        stFramingLayer.popupTemplate = popup;
        stFramingLayer.title = "Structural Framing";
        stFramingLayer.renderer = b_renderer;
        sublayersAll.push({ name: layer.modelName, layer: layer });
        break;

      case "StructuralColumns":
        stColumnLayer = layer;
        stColumnLayer.popupTemplate = popup;
        stColumnLayer.title = "Structural Columns";
        stColumnLayer.renderer = b_renderer;
        sublayersAll.push({ name: layer.modelName, layer: layer });
        break;

      case "StructuralFoundation":
        stFoundationLayer = layer;
        stFoundationLayer.popupTemplate = popup;
        stFoundationLayer.title = "Structural Foundation";
        stFoundationLayer.renderer = b_renderer;
        sublayersAll.push({ name: layer.modelName, layer: layer });
        break;

      default:
        layer.visible = true;
    }
  });
});
