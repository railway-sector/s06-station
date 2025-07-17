import {
  buildingLayer,
  floorsLayer,
  stColumnLayer,
  stFoundationLayer,
  stFramingLayer,
  wallsLayer,
  dateTable,
  stairsRailingLayer,
  roomsLayer,
  specialtyEquipmentLayer,
} from "./layers";
import StatisticDefinition from "@arcgis/core/rest/support/StatisticDefinition";
import Query from "@arcgis/core/rest/support/Query";

export const construction_status = [
  "To be Constructed",
  "Under Construction",
  "Completed",
];

// Updat date
export async function dateUpdate() {
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const query = dateTable.createQuery();
  query.where = "project = 'SC'" + " AND " + "category = 'Station Structures'";

  return dateTable.queryFeatures(query).then((response: any) => {
    const stats = response.features;
    const dates = stats.map((result: any) => {
      const date = new Date(result.attributes.date);
      const year = date.getFullYear();
      const month = monthList[date.getMonth()];
      const day = date.getDate();
      const final = year < 1990 ? "" : `${month} ${day}, ${year}`;
      return final;
    });
    return dates;
  });
}

export const station_names = ["Cabuyao", "Banlic", "Calamba"];

export const stationValues = [
  {
    station: station_names[0],
    value: 27,
  },
  {
    station: station_names[1],
    value: 29,
  },
  {
    station: station_names[2],
    value: 30,
  },
];

export const buildingLayerCategory = [
  "St.Foundation",
  "St.Framing",
  "St.Column",
  "Columns",
  "Floors",
  "Walls",
  "Others",
  //   'GenericModel',
  //   'Rooms',
  //   'Site',
  //   'Stairs',
  //   'StairsRailing',
];

export const layerVisibleTrue = () => {
  stColumnLayer.visible = true;
  stFoundationLayer.visible = true;
  stFramingLayer.visible = true;
  floorsLayer.visible = true;
  wallsLayer.visible = true;
  roomsLayer.visible = true;
  specialtyEquipmentLayer.visible = true;
  stairsRailingLayer.visible = true;
  buildingLayer.visible = true;
};

export async function generateChartData(station: any) {
  var total_incomp = new StatisticDefinition({
    onStatisticField: "CASE WHEN Status = 1 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_incomp",
    statisticType: "sum",
  });

  var total_comp = new StatisticDefinition({
    onStatisticField: "CASE WHEN Status = 4 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_comp",
    statisticType: "sum",
  });

  var total_ongoing = new StatisticDefinition({
    onStatisticField: "CASE WHEN Status = 2 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_ongoing",
    statisticType: "sum",
  });

  var query = new Query();
  query.outStatistics = [total_incomp, total_comp, total_ongoing];

  const find = stationValues.find((emp: any) => emp.station === station);
  const value = find?.value;
  const queryExpression = "Station = " + value;

  stColumnLayer.definitionExpression = queryExpression;
  stFoundationLayer.definitionExpression = queryExpression;
  stFramingLayer.definitionExpression = queryExpression;
  floorsLayer.definitionExpression = queryExpression;
  wallsLayer.definitionExpression = queryExpression;
  stairsRailingLayer.definitionExpression = queryExpression;
  roomsLayer.definitionExpression = queryExpression;
  specialtyEquipmentLayer.definitionExpression = queryExpression;

  query.where = queryExpression;
  layerVisibleTrue();

  const stColumnCompile = stColumnLayer
    .queryFeatures(query)
    .then((response: any) => {
      var stats = response.features[0].attributes;
      const total_incomp = stats.total_incomp;
      const total_comp = stats.total_comp;
      const total_ongoing = stats.total_ongoing;
      return [total_incomp, total_comp, total_ongoing];
    });

  const stFoundationCompile = stFoundationLayer
    .queryFeatures(query)
    .then((response: any) => {
      var stats = response.features[0].attributes;
      const total_incomp = stats.total_incomp;
      const total_comp = stats.total_comp;
      const total_ongoing = stats.total_ongoing;

      return [total_incomp, total_comp, total_ongoing];
    });

  const stFramingCompile = stFramingLayer
    .queryFeatures(query)
    .then((response: any) => {
      var stats = response.features[0].attributes;
      const total_incomp = stats.total_incomp;
      const total_comp = stats.total_comp;
      const total_ongoing = stats.total_ongoing;

      return [total_incomp, total_comp, total_ongoing];
    });

  const floorsCompile = floorsLayer
    .queryFeatures(query)
    .then((response: any) => {
      var stats = response.features[0].attributes;
      const total_incomp = stats.total_incomp;
      const total_comp = stats.total_comp;
      const total_ongoing = stats.total_ongoing;

      return [total_incomp, total_comp, total_ongoing];
    });

  const wallsCompile = wallsLayer.queryFeatures(query).then((response: any) => {
    var stats = response.features[0].attributes;
    const total_incomp = stats.total_incomp;
    const total_comp = stats.total_comp;
    const total_ongoing = stats.total_ongoing;

    return [total_incomp, total_comp, total_ongoing];
  });

  const stairsRailingCompile = stairsRailingLayer
    .queryFeatures(query)
    .then((response: any) => {
      var stats = response.features[0].attributes;
      const total_incomp = stats.total_incomp;
      const total_comp = stats.total_comp;
      const total_ongoing = stats.total_ongoing;

      return [total_incomp, total_comp, total_ongoing];
    });

  const roomsCompile = roomsLayer.queryFeatures(query).then((response: any) => {
    var stats = response.features[0].attributes;
    const total_incomp = stats.total_incomp;
    const total_comp = stats.total_comp;
    const total_ongoing = stats.total_ongoing;

    return [total_incomp, total_comp, total_ongoing];
  });

  const specialityEquipmentCompile = specialtyEquipmentLayer
    .queryFeatures(query)
    .then((response: any) => {
      var stats = response.features[0].attributes;
      const total_incomp = stats.total_incomp;
      const total_comp = stats.total_comp;
      const total_ongoing = stats.total_ongoing;

      return [total_incomp, total_comp, total_ongoing];
    });

  const stcolumn = await stColumnCompile;
  const stfoundation = await stFoundationCompile;
  const stframing = await stFramingCompile;
  const floors = await floorsCompile;
  const walls = await wallsCompile;
  const stairsRailing = await stairsRailingCompile;
  const rooms = await roomsCompile;
  const specialityEquipment = await specialityEquipmentCompile;

  const others_comp = rooms[1] + stairsRailing[1] + specialityEquipment[1];
  const others_incomp = rooms[0] + stairsRailing[0] + specialityEquipment[0];
  const others_ongoing = rooms[2] + stairsRailing[2] + specialityEquipment[2];

  const data = [
    {
      category: buildingLayerCategory[0],
      comp: stfoundation[1],
      incomp: stfoundation[0],
      ongoing: stfoundation[2],
    },
    {
      category: buildingLayerCategory[1],
      comp: stframing[1],
      incomp: stframing[0],
      ongoing: stframing[2],
    },
    {
      category: buildingLayerCategory[2],
      comp: stcolumn[1],
      incomp: stcolumn[0],
      ongoing: stcolumn[2],
    },
    {
      category: buildingLayerCategory[4],
      comp: floors[1],
      incomp: floors[0],
      ongoing: floors[2],
    },
    {
      category: buildingLayerCategory[5],
      comp: walls[1],
      incomp: walls[0],
      ongoing: walls[2],
    },
    {
      category: buildingLayerCategory[6],
      comp: others_comp,
      incomp: others_incomp,
      ongoing: others_ongoing,
    },
  ];

  return data;
}

export async function generateTotalProgress(station: any) {
  var total_number = new StatisticDefinition({
    onStatisticField: "Status",
    outStatisticFieldName: "total_number",
    statisticType: "count",
  });

  var total_comp = new StatisticDefinition({
    onStatisticField: "CASE WHEN Status = 4 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_comp",
    statisticType: "sum",
  });

  var query = new Query();
  query.outStatistics = [total_number, total_comp];

  const find = stationValues.find((emp: any) => emp.station === station);
  const value = find?.value;
  const queryExpression = "Station = " + value;
  query.where = queryExpression;

  const stColumnCompile = stColumnLayer
    .queryFeatures(query)
    .then((response: any) => {
      var stats = response.features[0].attributes;
      const total_number = stats.total_number;
      const total_comp = stats.total_comp;

      return [total_number, total_comp];
    });

  const stFoundationCompile = stFoundationLayer
    .queryFeatures(query)
    .then((response: any) => {
      var stats = response.features[0].attributes;
      const total_number = stats.total_number;
      const total_comp = stats.total_comp;

      return [total_number, total_comp];
    });

  const stFramingCompile = stFramingLayer
    .queryFeatures(query)
    .then((response: any) => {
      var stats = response.features[0].attributes;
      const total_number = stats.total_number;
      const total_comp = stats.total_comp;

      return [total_number, total_comp];
    });

  const floorsCompile = floorsLayer
    .queryFeatures(query)
    .then((response: any) => {
      var stats = response.features[0].attributes;
      const total_number = stats.total_number;
      const total_comp = stats.total_comp;

      return [total_number, total_comp];
    });

  const wallsCompile = wallsLayer.queryFeatures(query).then((response: any) => {
    var stats = response.features[0].attributes;
    const total_number = stats.total_number;
    const total_comp = stats.total_comp;

    return [total_number, total_comp];
  });

  const stairsRailingCompile = stairsRailingLayer
    .queryFeatures(query)
    .then((response: any) => {
      var stats = response.features[0].attributes;
      const total_number = stats.total_number;
      const total_comp = stats.total_comp;

      return [total_number, total_comp];
    });

  const roomsCompile = roomsLayer.queryFeatures(query).then((response: any) => {
    var stats = response.features[0].attributes;
    const total_number = stats.total_number;
    const total_comp = stats.total_comp;

    return [total_number, total_comp];
  });

  const specialityEquipmentCompile = specialtyEquipmentLayer
    .queryFeatures(query)
    .then((response: any) => {
      var stats = response.features[0].attributes;
      const total_number = stats.total_number;
      const total_comp = stats.total_comp;

      return [total_number, total_comp];
    });

  const stcolumn = await stColumnCompile;
  const stfoundation = await stFoundationCompile;
  const stframing = await stFramingCompile;
  const floors = await floorsCompile;
  const walls = await wallsCompile;
  const stairsRailing = await stairsRailingCompile;
  const rooms = await roomsCompile;
  const specialityEquipment = await specialityEquipmentCompile;

  const total =
    stcolumn[0] +
    stfoundation[0] +
    stframing[0] +
    floors[0] +
    walls[0] +
    stairsRailing[0] +
    rooms[0] +
    specialityEquipment[0];

  const comp =
    stcolumn[1] +
    stfoundation[1] +
    stframing[1] +
    floors[1] +
    walls[1] +
    stairsRailing[1] +
    rooms[1] +
    specialityEquipment[1];
  const progress = ((comp / total) * 100).toFixed(1);
  return [total, comp, progress];
}

// Thousand separators function
export function thousands_separators(num: any) {
  if (num) {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }
}

export function zoomToLayer(layer: any, view: any) {
  return layer.queryExtent().then((response: any) => {
    view
      ?.goTo(response.extent, {
        //response.extent
        speedFactor: 2,
      })
      .catch((error: any) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });
  });
}

// Layer list
export async function defineActions(event: any) {
  const { item } = event;
  if (item.layer.type !== "group") {
    item.panel = {
      content: "legend",
      open: true,
    };
  }
  item.title === "Chainage" ||
  item.title === "Pier No" ||
  item.title === "Viaduct"
    ? (item.visible = false)
    : (item.visible = true);
}
