import { useEffect, useRef, useState, use } from "react";
import { sublayersAll, buildingLayer, stationLayer } from "../layers";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { resetAllLayers, thousands_separators, zoomToLayer } from "../query";
import { ArcgisScene } from "@arcgis/map-components/dist/components/arcgis-scene";
import {
  station_name_f,
  stations_q,
  status_f,
  status_q,
  types_q,
} from "../uniqueValues";
import { MyContext } from "../contexts/MyContext";
import { queryDefinitionExpression } from "../queryExpression";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { legendSetter, rootSetter } from "../chartSetter";
import ChartStackColumns from "chart-stack-column";
import ChartStackColumnRender, { resetQuerc } from "chart-stack-column-render";
import QueryExpressionLayers from "query-layers-expression";

//------------------------------//
//      useStationData          //
//------------------------------//
function useStationData(
  stations: string,
  query: any,
  sublayersArray: any,
  arcgisScene: any,
) {
  return useQuery<any>({
    queryKey: [stations, types_q, stationLayer],
    queryFn: async () => {
      queryDefinitionExpression({
        queryExpression: query.queryExpression(),
        featureLayer: sublayersArray,
      });

      const chartData = await new ChartStackColumns({
        where: query,
        categoryTypes: types_q,
        categoryTypeField: undefined,
        layers: sublayersArray,
        statusField: status_f,
        statusState: [1, 2, 3, 4],
      }).chartDataStackColumns();

      stationLayer.definitionExpression = `Station = '${stations}'`;
      zoomToLayer(stationLayer, arcgisScene);

      return {
        chartData: chartData[0] || [],
        totaln: chartData[1] || 0,
        perc: chartData[2] || 0,
      };
    },
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });
}

// Draw chart
const Chart = () => {
  const { stations } = use(MyContext);
  const arcgisScene = document.querySelector("arcgis-scene") as ArcgisScene;

  const [chartPanelwidth, setChartPanelwidth] = useState<any>();
  const [resetButtonClicked, setResetButtonClicked] = useState<boolean>(false);

  const legendRef = useRef<unknown | any | undefined>({});
  const chartRef = useRef<unknown | any | undefined>({});
  const rendererRef = useRef<ChartStackColumnRender | null>(null);
  const chartID = "station-bar";

  //--- Query expression
  const qV = stations_q.find((item) => item.name === stations)?.value;

  const q1 = new QueryExpressionLayers({
    qFields: [station_name_f],
    qValues: [qV],
  });

  const sublayersArray = sublayersAll.map((item: any) => item.layer);

  const { data } = useStationData(stations, q1, sublayersArray, arcgisScene);
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
  const chartPaddingRightIconLabel = 10;

  //-------------------------------------//
  //    Responsive Chart parameters      //
  //-------------------------------------//
  const fontSize = chartPanelwidth / 20;
  const valueSize = fontSize * 1.6;
  const chartIconSize = chartPanelwidth * 0.07;
  const axisFontSize = chartPanelwidth * 0.036;
  const imageSize = chartPanelwidth * 0.04;

  //--- Keep click-handler-relevant values fresh without rebuilding the
  //    chart. view lives here too (not passed statically to the
  //    renderer) since arcgis-scene's view may not be ready on first
  //    mount.
  const configBaseArgs = {
    revit: true,
    layers: sublayersAll,
    buildingLayer: buildingLayer,
    chartCategoryTypeField: undefined,
    where: q1,
    status_field: status_f,
    view: arcgisScene?.view,
  };

  const configRef = useRef({ ...configBaseArgs });
  useEffect(() => {
    configRef.current = { ...configBaseArgs };
  }, [data, status_f, arcgisScene]);

  //---  Column Chart Renderer — created ONCE (mount only)
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
      x: 60,
      y: 97,
      marginTop: 20,
      layout: root.horizontalLayout,
    });
    legendRef.current = legend;

    //--- NOTE: no `view` here — it's read live from configRef.current
    //    inside chartrender.ts, since arcgis-scene may not have a
    //    ready `.view` yet at this point.
    const renderer = new ChartStackColumnRender({
      root,
      chart,
      data: [],
      configRef,
      chartCategoryTypes: types_q,
      statusTypename: ["Completed", "To be Constructed"],
      statusStatename: ["comp", "incomp"],
      statusArray: status_q,
      seriesStatusColor: status_q.map((c: any) => c.color),
      strokeColor: chartBorderLineColor,
      strokeWidth: chartBorderLineWidth,
      chartIconSize,
      axisFontSize,
      chartIconPositionX: 0,
      chartPaddingRightIconLabel,
      legend,
      updateChartPanelwidth: setChartPanelwidth,
    });
    rendererRef.current = renderer;
    renderer.chartRendererColumn();

    return () => {
      root.dispose();
      rendererRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //--- Push new data / inner value / affected-area figures into the
  //    already-mounted chart. No dispose, no rebuild -> no blink.
  //    NOTE: affectedAreaValue is NOT called here directly — it's
  //    registered once inside chartrender.ts and reads live data via
  //    closures, which updateData() keeps in sync. Calling it here on
  //    every render would both miss the first paint and stack
  //    duplicate adapters.
  useEffect(() => {
    const renderer = rendererRef.current;
    if (!renderer || !chartPanelwidth) return; // wait for a real width

    //--- Sizes are captured at construction, so refresh them here
    renderer.chartIconSize = chartIconSize;
    renderer.axisFontSize = axisFontSize;

    renderer.updateData(chartData);
  }, [chartData, chartPanelwidth]);

  useEffect(() => {
    resetQuerc(q1);
    resetAllLayers({ layers: sublayersAll });
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
          marginBottom: "1px",
        }}
      >
        <img
          src="https://EijiGorilla.github.io/Symbols/Station_Structures_icon.svg"
          alt="Station Structure Logo"
          height={`${imageSize}%`}
          width={`${imageSize}%`}
          style={{ paddingTop: "30px", paddingLeft: "15px" }}
        />
        <dl style={{ alignItems: "center" }}>
          <dt
            style={{
              color: primaryLabelColor,
              fontSize: `${fontSize}px`,
              marginRight: "10px",
            }}
          >
            TOTAL PROGRESS
          </dt>
          <dd
            style={{
              color: valueLabelColor,
              fontSize: `${valueSize}px`,
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
              fontSize: `${valueSize * 0.6}px`,
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
          marginTop: "1%",
        }}
      ></div>
      <div
        id="filterButton"
        style={{ width: "50%", marginLeft: "30%", paddingTop: "5%" }}
      >
        <calcite-button
          iconEnd="reset"
          onClick={() => setResetButtonClicked((prev: any) => !prev)}
        >
          Reset Chart Filter
        </calcite-button>
      </div>
    </>
  );
};

export default Chart;
