import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import {
  SimpleMarkerSymbol,
  LabelSymbol3D,
  MeshSymbol3D,
  FillSymbol3DLayer,
  TextSymbol3DLayer,
  SimpleLineSymbol,
} from "@arcgis/core/symbols";
import BuildingSceneLayer from "@arcgis/core/layers/BuildingSceneLayer";
import SolidEdges3D from "@arcgis/core/symbols/edges/SolidEdges3D";
import SceneLayer from "@arcgis/core/layers/SceneLayer";

export const dateTable = new FeatureLayer({
  portalItem: {
    id: "b2a118b088a44fa0a7a84acbe0844cb2",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
});
/* Chainage Layer  */
var labelChainage = new LabelClass({
  labelExpressionInfo: { expression: "$feature.KmSpot" },
  symbol: {
    type: "text",
    color: [85, 255, 0],
    haloColor: "black",
    haloSize: 0.5,
    font: {
      size: 15,
      weight: "bold",
    },
  },
});

var chainageRenderer = new SimpleRenderer({
  symbol: new SimpleMarkerSymbol({
    size: 5,
    color: [255, 255, 255, 0.9],
    outline: {
      width: 0.2,
      color: "black",
    },
  }),
});

export const chainageLayer = new FeatureLayer({
  portalItem: {
    id: "e09b9af286204939a32df019403ef438",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 2,
  title: "Chainage",
  elevationInfo: {
    mode: "relative-to-ground",
  },
  labelingInfo: [labelChainage],
  minScale: 150000,
  maxScale: 0,
  renderer: chainageRenderer,
  popupEnabled: false,
});

// * Pier No layer * //
var pierNoLabelClass = new LabelClass({
  symbol: new LabelSymbol3D({
    symbolLayers: [
      new TextSymbol3DLayer({
        material: {
          color: "white",
        },
        size: 10,
        halo: {
          color: "black",
          size: 1,
        },
        font: {
          family: "Ubuntu Mono",
        },
      }),
    ],
    verticalOffset: {
      screenLength: 40,
      maxWorldLength: 100,
      minWorldLength: 20,
    },
    callout: {
      type: "line", // autocasts as new LineCallout3D()
      color: "white",
      size: 0.7,
      border: {
        color: "grey",
      },
    },
  }),
  labelPlacement: "above-center",
  labelExpressionInfo: {
    expression: "$feature.PIER",
    //value: "{TEXTSTRING}"
  },
});

export const pierNoLayer = new FeatureLayer({
  portalItem: {
    id: "e09b9af286204939a32df019403ef438",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 3,
  labelingInfo: [pierNoLabelClass],
  elevationInfo: {
    mode: "on-the-ground", //absolute-height, relative-to-ground
  },
  title: "Pier No",
  popupEnabled: false,
});

// * PROW *//
var prowRenderer = new SimpleRenderer({
  symbol: new SimpleLineSymbol({
    color: "#ff0000",
    width: "2px",
  }),
});

export const prowLayer = new FeatureLayer({
  url: "https://gis.railway-sector.com/server/rest/services/SC_Alignment/FeatureServer/5",
  title: "ROW",
  popupEnabled: false,
  renderer: prowRenderer,
});

// * Station Layer * //
const stationLayerTextSymbol = new LabelClass({
  symbol: new LabelSymbol3D({
    symbolLayers: [
      new TextSymbol3DLayer({
        material: {
          color: "#d4ff33",
        },
        size: 13,
        halo: {
          color: "black",
          size: 0.5,
        },
        font: {
          family: "Ubuntu Mono",
        },
      }),
    ],
    verticalOffset: {
      screenLength: 70,
      maxWorldLength: 100,
      minWorldLength: 50,
    },
    callout: {
      type: "line", // autocasts as new LineCallout3D()
      color: "white",
      size: 0.7,
      border: {
        color: "grey",
      },
    },
  }),
  labelPlacement: "above-center",
  labelExpressionInfo: {
    expression: 'DefaultValue($feature.Station, "no data")',
    //value: "{TEXTSTRING}"
  },
});

export const stationLayer = new FeatureLayer({
  portalItem: {
    id: "e09b9af286204939a32df019403ef438",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 6,
  title: "Station",
  labelingInfo: [stationLayerTextSymbol],
  elevationInfo: {
    mode: "relative-to-ground",
  },
});
stationLayer.listMode = "hide";

/* Building Scene Layer for station structures */
export const buildingLayer = new BuildingSceneLayer({
  portalItem: {
    id: "8af94d0ef9894a1483651714e37a8317",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  title: "Station Structure",
});

// Discipline: Architectural
export let floorsLayer: null | any;
export let wallsLayer: null | any;
export let roomsLayer: null | any;
export let specialtyEquipmentLayer: null | any;
export let stairsRailingLayer: null | any;

// Discipline: Structural
export let stFramingLayer: null | any;
export let stColumnLayer: null | any;
export let stFoundationLayer: null | any;
export let exteriorShellLayer: null | any;

export const popuTemplate = {
  title: "{Station}",
  content: [
    {
      type: "fields",
      fieldInfos: [
        // {
        //   fieldName: 'target_date',
        //   label: 'Target Date',
        // },
        {
          fieldName: "Category",
          label: "Category",
        },
        {
          fieldName: "Status",
          label: "Construction Status",
        },
        {
          fieldName: "BldgLevel",
          label: "Building Level",
        },
        // {
        //   fieldName: "StructureLevel",
        //   label: "Structure Level",
        // },
      ],
    },
  ],
};

const colorStatus = [
  [225, 225, 225, 0.1], // To be Constructed (white)
  [211, 211, 211, 0.5], // Under Construction
  [255, 0, 0, 0.8], // Delayed
  [0, 112, 255, 0.8], // Completed
];

const renderer = new UniqueValueRenderer({
  field: "Status",
  uniqueValueInfos: [
    {
      value: 1,
      symbol: new MeshSymbol3D({
        symbolLayers: [
          new FillSymbol3DLayer({
            material: {
              color: colorStatus[0],
              colorMixMode: "replace",
            },
            edges: new SolidEdges3D({
              color: [225, 225, 225, 0.3],
            }),
          }),
        ],
      }),
    },
    {
      value: 2,
      symbol: new MeshSymbol3D({
        symbolLayers: [
          new FillSymbol3DLayer({
            material: {
              color: colorStatus[1],
              colorMixMode: "replace",
            },
            edges: new SolidEdges3D({
              color: [225, 225, 225, 0.3],
            }),
          }),
        ],
      }),
    },
    {
      value: 4,
      symbol: new MeshSymbol3D({
        symbolLayers: [
          new FillSymbol3DLayer({
            material: {
              color: colorStatus[3],
              colorMixMode: "replace",
            },
            edges: new SolidEdges3D({
              color: [225, 225, 225, 0.3],
            }),
          }),
        ],
      }),
    },
  ],
});

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
        floorsLayer.popupTemplate = popuTemplate;
        floorsLayer.title = "Floors";
        floorsLayer.renderer = renderer;
        //excludedLayers
        break;

      case "Walls":
        wallsLayer = layer;
        wallsLayer.popupTemplate = popuTemplate;
        wallsLayer.title = "Walls";
        wallsLayer.renderer = renderer;
        break;

      case "Rooms":
        roomsLayer = layer;
        roomsLayer.popupTemplate = popuTemplate;
        roomsLayer.title = "Rooms";
        roomsLayer.renderer = renderer;
        break;

      case "StairsRailing":
        stairsRailingLayer = layer;
        stairsRailingLayer.popupTemplate = popuTemplate;
        stairsRailingLayer.title = "Stairs Railing";
        stairsRailingLayer.renderer = renderer;
        break;

      case "SpecialtyEquipment":
        specialtyEquipmentLayer = layer;
        specialtyEquipmentLayer.popupTemplate = popuTemplate;
        specialtyEquipmentLayer.title = "Specialty Equipment";
        specialtyEquipmentLayer.renderer = renderer;
        break;

      case "StructuralFraming":
        stFramingLayer = layer;
        stFramingLayer.popupTemplate = popuTemplate;
        stFramingLayer.title = "Structural Framing";
        stFramingLayer.renderer = renderer;
        break;

      case "StructuralColumns":
        stColumnLayer = layer;
        stColumnLayer.popupTemplate = popuTemplate;
        stColumnLayer.title = "Structural Columns";
        stColumnLayer.renderer = renderer;
        break;

      case "StructuralFoundation":
        stFoundationLayer = layer;
        stFoundationLayer.popupTemplate = popuTemplate;
        stFoundationLayer.title = "Structural Foundation";
        stFoundationLayer.renderer = renderer;
        break;

      default:
        layer.visible = true;
    }
  });
});

// * Viaduct * //
const colorViaduct = [
  [225, 225, 225, 0.8], // To be Constructed (white), default = 0.1
  [130, 130, 130, 0.5], // Under Construction
  [255, 0, 0, 0.8], // Delayed
  [0, 112, 255, 0.8], // Completed
];

function renderViaductLayer() {
  const renderer = new UniqueValueRenderer({
    field: "Status",
  });

  for (var i = 0; i < colorViaduct.length; i++) {
    renderer.addUniqueValueInfo({
      value: i + 1,
      symbol: new MeshSymbol3D({
        symbolLayers: [
          new FillSymbol3DLayer({
            material: {
              color: colorViaduct[i],
              colorMixMode: "replace",
            },
            edges: new SolidEdges3D({
              color: [225, 225, 225, 0.3],
            }),
          }),
        ],
      }),
    });
  }
  viaductLayer.renderer = renderer;
}

export const viaductLayer = new SceneLayer({
  portalItem: {
    id: "1f89733a04b443e2a1e0e5e6dfd493e3",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  elevationInfo: {
    mode: "absolute-height", //absolute-height, relative-to-ground
  },
  title: "Viaduct",
  labelsVisible: false,
  popupEnabled: false,
  definitionExpression: "CP = 'S-02'",
});

renderViaductLayer();

export const alignmentGroupLayer = new GroupLayer({
  title: "Alignment",
  visible: true,
  visibilityMode: "independent",
  layers: [chainageLayer, pierNoLayer, prowLayer], //stationLayer,
});
