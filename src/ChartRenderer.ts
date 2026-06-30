import { buildingLayer } from "./layers";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter";
import BuildingComponentSublayer from "@arcgis/core/layers/buildingSublayers/BuildingComponentSublayer.js";
import type { StatusStateType } from "./uniqueValues";
import type { StatusTypenamesType } from "./uniqueValues";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import type BuildingSceneLayer from "@arcgis/core/layers/BuildingSceneLayer";
import type SceneLayer from "@arcgis/core/layers/SceneLayer";

//-- Responsve parameters
export function responsiveChart(chart: any, legend: any) {
  chart.onPrivate("width", (width: any) => {
    const availableSpace = width * 0.35; // original 0.7
    const new_fontSize = width / 35;

    legend.labels.template.setAll({
      fill: am5.color("#ffffff"),
      fontSize: new_fontSize,
    });

    legend.itemContainers.template.setAll({
      width: availableSpace,
      marginLeft: 10,
      marginRight: 10,
    });
  });
}

interface layerViewQueryType {
  layer?: any;
  sublayersCollection?: any;
  chartCategoryTypes?: any;
  categorySelected?: any;
  qChart?: any;
  sublayerNames?: any;
  view: any;
  setLayerViewFilter?: any;
  highlightedSublayerView?: any;
}

// BuildingLayer Sublayers
export const sublayersQuery = (
  sublayersCollection: any,
  chartCategoryTypes: any,
  categorySelected: any,
  expression: any,
) => {
  const modelNameSelected = chartCategoryTypes.find(
    (item: any) => item.category === categorySelected,
  )?.modelName;

  if (!modelNameSelected) {
    // 'Others'
    sublayersCollection.map((sublayer: any) => {
      sublayer.layer.definitionExpression = expression;
      sublayer.layer.visible = true;
    });
  } else {
    sublayersCollection.map((sublayer: any) => {
      if (sublayer.name === modelNameSelected) {
        sublayer.layer.definitionExpression = expression;
        sublayer.layer.visible = true;
      } else {
        sublayer.layer.visible = false;
      }
    });
  }
};

export const highlightFilterBuildingSublayerView = ({
  layer,
  sublayersCollection,
  chartCategoryTypes,
  categorySelected,
  qChart,
  sublayerNames,
  view,
  setLayerViewFilter, // useState
  highlightedSublayerView,
}: layerViewQueryType) => {
  const qe = qChart.queryExpression();
  view?.whenLayerView(layer).then((layerView: any) => {
    //--- Create sublayerview
    const sublayerView = layerView.sublayerViews.find((sublayerView: any) => {
      return sublayerView.sublayer.modelName === sublayerNames;
    });

    const query = sublayerView.createQuery();
    sublayerView.queryObjectIds(query).then((result: any) => {
      highlightedSublayerView.current = sublayerView.highlight(result);
    });

    setLayerViewFilter(sublayerView);
    sublayersQuery(
      sublayersCollection,
      chartCategoryTypes,
      categorySelected,
      qe,
    );

    if (sublayerView) {
      highlightedSublayerView.current &&
        highlightedSublayerView.current.remove();
      sublayerView.filter = new FeatureFilter({
        where: undefined,
      });
    } else {
      sublayerView.filter = new FeatureFilter({
        where: qe,
      });
      highlightedSublayerView.current &&
        highlightedSublayerView.current.remove();
    }
  });
};

//--- Reset queryc
export function resetQuerc(queryc: any) {
  queryc.qExpression = undefined;
  queryc.q2Expression = undefined;
  queryc.status = undefined;
  queryc.statusField = undefined;
  queryc.chartCategory = undefined;
  queryc.chartCategoryField = undefined;
}

//--- Click event on series
interface clickSerisType {
  series: any;
  qChart: any;
  sublayersCollection: any;
  chartCategoryTypes: any;
  chartCategoryFieldRevit: any;
  statusStatename: any;
  statusArray: any;
  statusField: any;
  arcgisScene: any;
  setSublayerViewFilter: any; // useState
  highlightedSublayerView: any;
}

export function clickSeries({
  series,
  qChart,
  sublayersCollection,
  chartCategoryTypes,
  chartCategoryFieldRevit,
  statusStatename,
  statusArray,
  statusField,
  arcgisScene,
  setSublayerViewFilter, // useState
  highlightedSublayerView,
}: clickSerisType) {
  series?.columns.template.events.on("click", (ev: any) => {
    const selected: any = ev.target.dataItem?.dataContext;
    const categorySelected: string = selected.category;
    const find = chartCategoryTypes.find(
      (emp: any) => emp.category === categorySelected,
    );
    const typeSelected = find?.value;

    qChart.chartCategory = typeSelected;
    qChart.chartCategoryField = chartCategoryFieldRevit;
    qChart.status = statusArray.find(
      (item: any) => item.status === statusStatename,
    ).value;
    qChart.statusField = statusField;

    //--- Find sublayer
    const selectedSublayerName = chartCategoryTypes.find(
      (emp: any) => emp.category === categorySelected,
    )?.modelName;

    //--- Hilight and Filter
    // Building sublayers
    highlightFilterBuildingSublayerView({
      layer: buildingLayer,
      sublayersCollection: sublayersCollection,
      chartCategoryTypes: chartCategoryTypes,
      categorySelected: categorySelected,
      qChart: qChart,
      sublayerNames: selectedSublayerName,
      view: arcgisScene?.view,
      setLayerViewFilter: setSublayerViewFilter,
      highlightedSublayerView: highlightedSublayerView,
    });
  });
}

//--- Chart series
interface makeSerisType {
  root: any;
  chart: any;
  data: any;
  qChart: any;
  chartCategoryTypes: any;
  chartCategoryFieldRevit: any;
  statusTypename: any;
  statusStatename: any;
  statusArray: any;
  statusField: any;
  xAxis: any;
  yAxis: any;
  legend: any;
  new_axisFontSize: any;
  seriesStatusColor: any;
  strokeColor: any;
  strokeWidth: any;
  arcgisScene: any;
  sublayersCollection?: any;
  setSublayerViewFilter?: any;
  highlightedSublayerView?: any;
}

export function makeSeries({
  root,
  chart,
  data,
  qChart,
  chartCategoryTypes,
  chartCategoryFieldRevit,
  statusTypename,
  statusStatename,
  statusArray,
  statusField,
  xAxis,
  yAxis,
  legend,
  new_axisFontSize,
  seriesStatusColor,
  strokeColor,
  strokeWidth,
  arcgisScene,
  sublayersCollection,
  setSublayerViewFilter,
  highlightedSublayerView,
}: makeSerisType) {
  const series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: statusTypename,
      stacked: true,
      xAxis: xAxis,
      yAxis: yAxis,
      baseAxis: yAxis,
      valueXField: statusStatename,
      valueXShow: "valueXTotalPercent",
      categoryYField: "category",
      fill:
        statusStatename === "incomp"
          ? am5.color(seriesStatusColor[0])
          : statusStatename === "comp"
            ? am5.color(seriesStatusColor[3])
            : statusStatename === "delayed"
              ? am5.color(seriesStatusColor[2])
              : am5.color(seriesStatusColor[1]),
      stroke: am5.color(strokeColor),
    }),
  );

  series?.columns?.template.setAll({
    fillOpacity: statusStatename === "comp" ? 1 : 0.5,
    tooltipText: "{name}: {valueX}", // "{categoryY}: {valueX}",
    tooltipY: am5.percent(90),
    strokeWidth: strokeWidth,
  });
  series.data.setAll(data);

  series.appear();

  series.bullets.push(() => {
    return am5.Bullet.new(root, {
      sprite: am5.Label.new(root, {
        text:
          statusStatename === "incomp"
            ? ""
            : "{valueXTotalPercent.formatNumber('#.')}%", //"{valueX}",
        fill: root.interfaceColors.get("alternativeText"),
        opacity: statusStatename === "incomp" ? 0 : 1,
        fontSize: new_axisFontSize,
        centerY: am5.p50,
        centerX: am5.p50,
        populateText: true,
      }),
    });
  });

  // Click series
  clickSeries({
    series: series,
    qChart: qChart,
    sublayersCollection: sublayersCollection,
    chartCategoryTypes: chartCategoryTypes,
    chartCategoryFieldRevit: chartCategoryFieldRevit,
    statusStatename: statusStatename,
    statusArray: statusArray,
    statusField: statusField,
    arcgisScene: arcgisScene,
    setSublayerViewFilter: setSublayerViewFilter,
    highlightedSublayerView: highlightedSublayerView,
  });

  legend?.data?.push(series);
}

//--- Chart Renderer
interface chartType {
  root: any;
  chart: any;
  data: any;
  sublayersCollection: any;
  qChart: any;
  chartCategoryTypes?: any;
  chartCategoryFieldRevit?: any;
  chartCategoryFieldScene?: any;
  // 'statusTypename' and 'statusStatename': E.g., you can add or delete status you wish to add in stacked columns.
  statusTypename: StatusTypenamesType[]; // order has no effect on statistics
  statusStatename: StatusStateType[]; // order affects the order displayed in stacked column charts
  statusArray: any;
  statusField: any;
  seriesStatusColor: any;
  strokeColor: any;
  strokeWidth: any;
  arcgisScene: any;
  setClickedCategory?: any;
  setSublayerViewFilter: any;
  highlightedSublayerView?: any;
  new_chartIconSize: any;
  new_axisFontSize: any;
  chartIconPositionX?: any;
  chartPaddingRightIconLabelSpace?: any;
  legend: any;
  updateChartPanelwidth: any;
}
export function chartRenderer({
  root,
  chart,
  data,
  qChart,
  sublayersCollection,
  chartCategoryTypes,
  chartCategoryFieldRevit,
  statusTypename,
  statusStatename,
  statusArray,
  statusField,
  seriesStatusColor,
  strokeColor,
  strokeWidth,
  arcgisScene,
  setSublayerViewFilter,
  highlightedSublayerView,
  new_chartIconSize,
  new_axisFontSize,
  chartIconPositionX,
  chartPaddingRightIconLabelSpace,
  legend,
  updateChartPanelwidth,
}: chartType) {
  // Axis Renderer
  const yRenderer = am5xy.AxisRendererY.new(root, {
    inversed: true,
  });

  //--- yAxix
  const yAxis = chart.yAxes.push(
    am5xy.CategoryAxis.new(root, {
      categoryField: "category",
      renderer: yRenderer,
      bullet: function (root: any, _axis: any, dataItem: any) {
        return am5xy.AxisBullet.new(root, {
          location: 0.5,
          sprite: am5.Picture.new(root, {
            width: new_chartIconSize,
            height: new_chartIconSize,
            centerY: am5.p50,
            centerX: am5.p50,
            x: chartIconPositionX,
            src: dataItem.dataContext.icon,
          }),
        });
      },
      tooltip: am5.Tooltip.new(root, {}),
    }),
  );

  yRenderer.labels.template.setAll({
    paddingRight: chartPaddingRightIconLabelSpace
      ? chartPaddingRightIconLabelSpace
      : null,
  });

  yRenderer.grid.template.setAll({
    location: 1,
  });

  yAxis.get("renderer").labels.template.setAll({
    oversizedBehavior: "wrap",
    textAlign: "center",
    fill: am5.color("#ffffff"),
    //maxWidth: 150,
    fontSize: new_axisFontSize,
  });
  yAxis.data.setAll(data);

  //--- xAxix
  const xAxis = chart.xAxes.push(
    am5xy.ValueAxis.new(root, {
      min: 0,
      max: 100,
      strictMinMax: true,
      numberFormat: "#'%'",
      calculateTotals: true,
      renderer: am5xy.AxisRendererX.new(root, {
        strokeOpacity: 0,
        strokeWidth: 1,
        stroke: am5.color("#ffffff"),
      }),
    }),
  );

  xAxis.get("renderer").labels.template.setAll({
    //oversizedBehavior: "wrap",
    textAlign: "center",
    fill: am5.color("#ffffff"),
    //maxWidth: 150,
    fontSize: new_axisFontSize,
  });

  //--- Responsive Chart
  responsiveChart(chart, legend);
  chart.onPrivate("width", (width: any) => {
    updateChartPanelwidth(width);
  });

  //--- Make Series
  statusTypename &&
    statusTypename.map((statustype: any, index: any) => {
      makeSeries({
        root: root,
        chart: chart,
        data: data,
        qChart: qChart,
        chartCategoryTypes: chartCategoryTypes,
        chartCategoryFieldRevit: chartCategoryFieldRevit,
        statusTypename: statustype,
        statusStatename: statusStatename[index],
        statusArray: statusArray,
        statusField: statusField,
        xAxis: xAxis,
        yAxis: yAxis,
        legend: legend,
        new_axisFontSize: new_axisFontSize,
        seriesStatusColor: seriesStatusColor,
        strokeColor: strokeColor,
        strokeWidth: strokeWidth,
        arcgisScene: arcgisScene,
        sublayersCollection: sublayersCollection,
        setSublayerViewFilter: setSublayerViewFilter,
        highlightedSublayerView: highlightedSublayerView,
      });
    });
}

interface layersRevitVisibilityType {
  layers:
    | [
        BuildingComponentSublayer?,
        BuildingComponentSublayer?,
        BuildingComponentSublayer?,
        BuildingComponentSublayer?,
        BuildingComponentSublayer?,
        BuildingComponentSublayer?,
        BuildingSceneLayer?,
        SceneLayer?,
        FeatureLayer?,
      ]
    | any;
  qExpression?: any;
}

export const resetAllLayers = ({
  layers,
  qExpression,
}: layersRevitVisibilityType) => {
  layers.map((layer: any) => {
    if (layer) {
      if (qExpression) {
        layer.layer.definitionExpression = qExpression;
        layer.layer.visible = true;
      } else {
        layer.layer.definitionExpression = "1=1";
        layer.layer.visible = true;
      }
    }
  });
};
