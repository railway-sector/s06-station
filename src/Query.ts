/* eslint-disable @typescript-eslint/no-unused-expressions */
import QueryExpressionLayers from "query-layers-expression";
import { dateTable } from "./layers";

//---------------------------------------------------------//
//                 Add Layers to Map                      //
//---------------------------------------------------------//
export function addLayersToMap(map: any, layersList: any[]) {
  layersList.forEach((layer: any) => {
    map.add(layer);
  });
}

//--- Returns query expression
export const makeQuery = (
  qValues: any,
  qFields: any,
  qExpression?: string,
  q2Expression?: string,
) => {
  const q = new QueryExpressionLayers();
  q.qValues = qValues;
  q.qFields = qFields;
  if (qExpression) q.qExpression = qExpression;
  if (q2Expression) q.q2Expression = q2Expression;
  return q;
};

//---------------------------------------------//
//             Stacked Column chart            //
//---------------------------------------------//
//--- Chart Data Generation helper function
// `pieChartData` function helps to assign parameter names to class `ChartPieSeries`
interface StackColumnChartDataType {
  colchart: any;
  qChart: any;
  categoryTypes: any;
  categoryTypeField: any;
  layers: any;
  statusField: any;
  statusState: any;
}

export async function stackColumnChartData({
  colchart,
  qChart,
  categoryTypes,
  categoryTypeField,
  layers,
  statusField,
  statusState,
}: StackColumnChartDataType) {
  Object.assign(colchart, {
    qChart: qChart.queryExpression(),
    categoryTypes,
    categoryTypeField,
    layers,
    statusField,
    statusState,
  });
  return await colchart.chartDataStackColumns();
}

type StatusTypeNamesType =
  | "To be Constructed"
  | "Under Construction"
  | "delayed"
  | "Completed"
  | "Exceeded"
  | "Normal";

type StatusStateType =
  | "comp"
  | "incomp"
  | "ongoing"
  | "delayed"
  | "exceeded"
  | "normal";

interface ChartStackColumnRender {
  render: any;
  revit: boolean;
  layers: any;
  root: any;
  chart: any;
  data: any;
  buildingLayer?: any;
  qChart: any;
  chartCategoryTypes: any;
  chartCategoryTypeField: any;
  statusTypename: StatusTypeNamesType[];
  statusStatename: StatusStateType[];
  statusArray: any;
  statusField: any;
  seriesStatusColor: any;
  strokeColor: any;
  strokeWidth: any;
  view: any;
  setLayerViewFilter?: any;
  new_chartIconSize: any;
  new_axisFontSize: any;
  chartIconPositionX?: any;
  chartPaddingRightIconLabel: any;
  legend: any;
  updateChartPanelwidth: any;
}

export async function stackColumnChartRender({
  render,
  ...props
}: ChartStackColumnRender) {
  Object.assign(render, props);
  return await render.chartRendererColumn();
}

//--------------------------------------//
//         Reset layer visibility       //
//--------------------------------------//
interface LayersRevitVisibilityType {
  layers: any;
  qExpression?: string;
}

export const resetAllLayers = ({
  layers,
  qExpression,
}: LayersRevitVisibilityType) => {
  if (!layers) return;
  layers.forEach((layer: any) => {
    if (!layer) return;
    layer.layer.definitionExpression = qExpression ?? "1=1";
    layer.layer.visible = true;
  });
};

//---------------------------------------------------------//
//                Date Function                           //
//---------------------------------------------------------//
export function yearMonthDay(date: Date) {
  return {
    year: date?.getFullYear() ?? 0,
    month: date?.getMonth() + 1,
    day: date?.getDate(),
  };
}

export function toAsofdate(date: Date) {
  //--- Return displayed date: (as of date)
  const { year, day } = yearMonthDay(date);
  const cmonth = date?.toLocaleString("en-US", { month: "long" });

  return year <= 1970 ? "" : `${cmonth} ${day}, ${year}`;
}

export async function dateUpdate(category: string) {
  //--- Only executed during an initial render
  const query = dateTable.createQuery();
  query.where = `project = 'SC' AND category = '${category}'`;

  const { features } = await dateTable.queryFeatures(query);
  return features.map(({ attributes }: any) => {
    const asofdate = toAsofdate(new Date(attributes.date));

    return asofdate;
  });
}

//---------------------------------//
//           Media query           //
//---------------------------------//
export async function mediaQuery(layer: any, ID: any) {
  const query = layer.createQuery();
  query.where = `id = ${ID}`;

  const result = await layer.queryFeatures(query);
  return result.features
    .map((item: any) => {
      return {
        timestamp: Number(item.attributes["TimeStamp"]),
        path: item.attributes["Path"],
      };
    })
    .sort((a: any, b: any) => a.timestamp - b.timestamp);
}

interface updateMediaInfoType {
  mediaLayer: any;
  id: any;
  srcpath: any;
  timestamp: any;
}
export async function updateMediaInfo({
  mediaLayer,
  id,
  srcpath,
  timestamp,
}: updateMediaInfoType) {
  const [first, second] = await mediaQuery(mediaLayer, id);

  srcpath([first.path, second?.path ?? ""]);
  timestamp([first.timestamp, second?.timestamp ?? ""]);
}

export async function mediaTimestampToDates(timestamp: any) {
  const parseTimestamp = (ts: number | string) => {
    const str = ts.toString();
    const year = Number(str.slice(0, 4));
    const month = Number(str.slice(4, 6)) - 1; // JS months are 0-indexed
    return new Date(year, month, 1);
  };

  const date1 = parseTimestamp(timestamp[0]);
  const date2 = parseTimestamp(timestamp[1]);

  const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "long" });

  return {
    yyyy1: date1.getFullYear().toString(),
    yyyy2: date2.getFullYear().toString(),
    mm1: monthFormatter.format(date1),
    mm2: monthFormatter.format(date2),
  };
}

//---------------------------------//
//           Others           //
//---------------------------------//
// Thousand separators function
export function thousands_separators(num: any) {
  if (!num) return;
  const num_parts = num.toString().split(".");
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num_parts.join(".");
}

export function zoomToLayer(layer: any, view: any) {
  return layer.queryExtent().then((response: any) => {
    view?.goTo(response.extent, { speedFactor: 2 }).catch((error: any) => {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    });
  });
}
