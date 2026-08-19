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
import { useQuery } from "@tanstack/react-query";
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

    //-- Chart render
    const chartIconPositionX = 0;

    new ChartStackColumnRender({
      revit: true,
      layers: sublayersAll,
      root,
      chart,
      data: chartData,
      buildingLayer: buildingLayer,
      where: q1,
      chartCategoryTypes: types_q,
      chartCategoryTypeField: undefined,
      statusTypename: ["Completed", "To be Constructed"],
      statusStatename: ["comp", "incomp"],
      statusArray: status_q,
      statusField: status_f,
      seriesStatusColor: status_q.map((c: any) => c.color),
      strokeColor: chartBorderLineColor,
      strokeWidth: chartBorderLineWidth,
      view: arcgisScene?.view,
      new_chartIconSize,
      new_axisFontSize,
      chartIconPositionX,
      chartPaddingRightIconLabel,
      legend,
      updateChartPanelwidth: setChartPanelwidth,
    }).chartRendererColumn();

    return () => {
      root.dispose();
    };
  });

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
