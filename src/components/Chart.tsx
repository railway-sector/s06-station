import { useEffect, useRef, useState, use } from "react";
import { stColumnLayer, sublayersAll, queryc, chartstack } from "../layers";
import SubLayerView from "@arcgis/core/views/layers/BuildingComponentSublayerView";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { thousands_separators, zoomToLayer } from "../query";
import { ArcgisScene } from "@arcgis/map-components/dist/components/arcgis-scene";
import {
  chart_colors,
  stationName_field,
  stationValues,
  status_field,
  statusArray,
  structureTypes,
} from "../uniqueValues";
import { chartRenderer, resetAllLayers, resetQuerc } from "../chartRenderer";
import { MyContext } from "../contexts/MyContext";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter";
import { queryDefinitionExpression } from "../queryExpression";
import { useQuery } from "@tanstack/react-query";
import { legendSetter, rootSetter } from "../chartSetter";

// Draw chart
const Chart = () => {
  const { stations } = use(MyContext);
  const [chartPanelwidth, setChartPanelwidth] = useState<any>();
  const arcgisScene = document.querySelector("arcgis-scene") as ArcgisScene;
  const legendRef = useRef<unknown | any | undefined>({});
  const chartRef = useRef<unknown | any | undefined>({});
  const [sublayerViewFilter, setSublayerViewFilter] = useState<
    SubLayerView | any
  >();
  const [resetButtonClicked, setResetButtonClicked] = useState<boolean>(false);
  const highlightedSublayerView = useRef<any>(undefined);
  const chartID = "station-bar";

  const { data } = useQuery<any>({
    queryKey: [structureTypes, stations],
    queryFn: async () => {
      const sublayersArray = sublayersAll.map((item: any) => item.layer);

      queryc.qValues = [
        stationValues.find((item) => item.station === stations)?.value,
      ];
      queryc.qFields = [stationName_field];

      queryDefinitionExpression({
        queryExpression: queryc.queryExpression(),
        featureLayer: sublayersArray,
      });

      chartstack.qChart = queryc.queryExpression();
      chartstack.layers = sublayersArray;
      chartstack.categoryTypes = structureTypes;
      chartstack.categoryTypeField = undefined;
      chartstack.statusState = [1, 2, 3, 4];
      const chartData = await chartstack.chartDataStackColumns();

      zoomToLayer(stColumnLayer, arcgisScene);

      return {
        chartData: chartData[0] || [],
        totaln: chartData[1] || 0,
        perc: chartData[2] || 0,
      };
    },
    // staleTime: Infinity,
  });
  const chartData = data?.chartData || [];
  const totaln = data?.totaln || 0;
  const perc_comp = data?.perc || 0;

  // Define parameters
  const marginTop = 0;
  const marginLeft = 0;
  const marginRight = 0;
  const marginBottom = 0;
  const paddingTop = 10;
  const paddingLeft = 5;
  const paddingRight = 5;
  const paddingBottom = 0;
  const chartBorderLineColor = "#00c5ff";
  const chartBorderLineWidth = 0.4;
  const chartPaddingRightIconLabelSpace = 10;

  //-------------------------------------//
  //    Responsive Chart parameters      //
  //-------------------------------------//
  const new_fontSize = chartPanelwidth / 20;
  const new_valueSize = new_fontSize * 1.6;
  const new_chartIconSize = chartPanelwidth * 0.07;
  const new_axisFontSize = chartPanelwidth * 0.036;
  const new_imageSize = chartPanelwidth * 0.04;

  useEffect(() => {
    const root = rootSetter({ chartID: chartID });

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        layout: root.verticalLayout,
        marginTop: marginTop,
        marginLeft: marginLeft,
        marginRight: marginRight,
        marginBottom: marginBottom,
        paddingTop: paddingTop,
        paddingLeft: paddingLeft,
        paddingRight: paddingRight,
        paddingBottom: paddingBottom,
        scale: 1,
        height: am5.percent(100),
      }),
    );
    chartRef.current = chart;

    const legend = legendSetter({
      chart: chart,
      root: root,
      centerX: 50,
      centerY: 50,
      x: 50,
      marginTop: 20,
      scale: 0.9,
      layout: root.horizontalLayout,
    });
    legendRef.current = legend;

    chartRenderer({
      root: root,
      chart: chart,
      data: chartData,
      qChart: queryc,
      chartCategoryTypes: structureTypes,
      chartCategoryFieldRevit: undefined,
      statusTypename: ["Completed", "To be Constructed", "Under Construction"], //["Completed", "To be Constructed", "Under Construction"],
      statusStatename: ["comp", "incomp", "ongoing"], //["comp", "incomp", "ongoing"],
      statusArray: statusArray,
      statusField: status_field,
      seriesStatusColor: chart_colors,
      strokeColor: chartBorderLineColor,
      strokeWidth: chartBorderLineWidth,
      arcgisScene: arcgisScene,
      setSublayerViewFilter: setSublayerViewFilter,
      sublayersCollection: sublayersAll,
      highlightedSublayerView: highlightedSublayerView,
      chartPaddingRightIconLabelSpace: chartPaddingRightIconLabelSpace,
      new_chartIconSize: new_chartIconSize,
      new_axisFontSize: new_axisFontSize,
      legend: legend,
      updateChartPanelwidth: setChartPanelwidth,
    });

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  });

  useEffect(() => {
    highlightedSublayerView.current && highlightedSublayerView.current.remove();

    if (sublayerViewFilter) {
      sublayerViewFilter.filter = new FeatureFilter({
        where: undefined,
      });
      resetQuerc(queryc);
      resetAllLayers({ layers: sublayersAll });
    }
  }, [resetButtonClicked]);

  const primaryLabelColor = "#9ca3af";
  const valueLabelColor = "#d1d5db";

  return (
    <>
      <div
        style={{
          display: "flex",
          marginTop: "3px",
          marginLeft: "15px",
          marginRight: "15px",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <img
          src="https://EijiGorilla.github.io/Symbols/Station_Structures_icon.svg"
          alt="Station Structure Logo"
          height={`${new_imageSize}%`}
          width={`${new_imageSize}%`}
          style={{ paddingTop: "30px", paddingLeft: "15px" }}
        />
        <dl style={{ alignItems: "center" }}>
          <dt
            style={{
              color: primaryLabelColor,
              fontSize: `${new_fontSize}px`,
              marginRight: "10px",
            }}
          >
            TOTAL PROGRESS
          </dt>
          <dd
            style={{
              color: valueLabelColor,
              fontSize: `${new_valueSize}px`,
              fontWeight: "bold",
              fontFamily: "calibri",
              lineHeight: "1.2",
              margin: "auto",
            }}
          >
            {thousands_separators(perc_comp)} %
          </dd>
          <div
            style={{
              color: valueLabelColor,
              fontSize: `${new_valueSize * 0.6}px`,
              fontFamily: "calibri",
            }}
          >
            ({thousands_separators(totaln)})
          </div>
        </dl>
      </div>

      <div
        id={chartID}
        style={{
          height: "67vh",
          color: "white",
          marginRight: "10px",
          marginTop: "5%",
        }}
      ></div>
      <div
        id="filterButton"
        style={{
          width: "50%",
          marginLeft: "30%",
          paddingTop: "5%",
        }}
      >
        <calcite-button
          iconEnd="reset"
          onClick={() =>
            setResetButtonClicked(resetButtonClicked === false ? true : false)
          }
        >
          Reset Chart Filter
        </calcite-button>
      </div>
    </>
  );
};

export default Chart;
