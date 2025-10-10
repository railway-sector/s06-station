import { useEffect, useRef, useState, use } from "react";
import {
  stColumnLayer,
  stFoundationLayer,
  stFramingLayer,
  floorsLayer,
  wallsLayer,
  stairsRailingLayer,
  roomsLayer,
  specialtyEquipmentLayer,
} from "../layers";

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import "../App.css";
import {
  buildingLayerCategory,
  construction_status,
  generateChartData,
  generateTotalProgress,
  layerVisibleTrue,
  thousands_separators,
  zoomToLayer,
} from "../Query";
import "@esri/calcite-components/dist/components/calcite-label";
import { CalciteLabel } from "@esri/calcite-components-react";
import { ArcgisScene } from "@arcgis/map-components/dist/components/arcgis-scene";
import { MyContext } from "../App";

// Dispose function
function maybeDisposeRoot(divId: any) {
  am5.array.each(am5.registry.rootElements, function (root) {
    if (root.dom.id === divId) {
      root.dispose();
    }
  });
}

// Draw chart
const Chart = () => {
  const arcgisScene = document.querySelector("arcgis-scene") as ArcgisScene;
  const { stations } = use(MyContext);
  const legendRef = useRef<unknown | any | undefined>({});
  const chartRef = useRef<unknown | any | undefined>({});
  const [chartData, setChartData] = useState([]);
  const [progress, setProgress] = useState([]);
  const chartID = "station-bar";

  useEffect(() => {
    generateChartData(stations).then((response: any) => {
      setChartData(response);
    });

    generateTotalProgress(stations).then((response: any) => {
      setProgress(response);
    });

    zoomToLayer(stColumnLayer, arcgisScene);
  }, [stations]);

  // Define parameters
  const marginTop = 0;
  const marginLeft = 0;
  const marginRight = 0;
  const marginBottom = 0;
  const paddingTop = 10;
  const paddingLeft = 5;
  const paddingRight = 5;
  const paddingBottom = 0;

  const xAxisNumberFormat = "#'%'";
  const seriesBulletLabelFontSize = "1vw";

  // axis label
  const yAxisLabelFontSize = "0.8vw";
  const xAxisLabelFontSize = "0.8vw";
  const legendFontSize = "0.8vw";

  const chartPaddingRightIconLabel = 10;

  const chartSeriesFillColorComp = "#0070ff";
  const chartSeriesFillColorIncomp = "#000000";
  const chartSeriesFillColorOngoing = "#d3d3d3"; // orfiginal: #FF0000
  const chartBorderLineColor = "#00c5ff";
  const chartBorderLineWidth = 0.4;

  useEffect(() => {
    maybeDisposeRoot(chartID);

    var root = am5.Root.new(chartID);
    root.container.children.clear();
    root._logo?.dispose();

    // Set themesf
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root),
      am5themes_Responsive.new(root),
    ]);

    var chart = root.container.children.push(
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
      })
    );
    chartRef.current = chart;

    var yRenderer = am5xy.AxisRendererY.new(root, {
      inversed: true,
    });
    var yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: yRenderer,

        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    yRenderer.labels.template.setAll({
      paddingRight: chartPaddingRightIconLabel,
    });

    yRenderer.grid.template.setAll({
      location: 1,
    });

    // Label properties Y axis
    yAxis.get("renderer").labels.template.setAll({
      oversizedBehavior: "wrap",
      textAlign: "center",
      fill: am5.color("#ffffff"),
      //maxWidth: 150,
      fontSize: yAxisLabelFontSize,
    });

    yAxis.data.setAll(chartData);

    var xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: 100,
        strictMinMax: true,
        numberFormat: xAxisNumberFormat,
        calculateTotals: true,
        renderer: am5xy.AxisRendererX.new(root, {
          strokeOpacity: 0,
          strokeWidth: 1,
          stroke: am5.color("#ffffff"),
        }),
      })
    );

    xAxis.get("renderer").labels.template.setAll({
      //oversizedBehavior: "wrap",
      textAlign: "center",
      fill: am5.color("#ffffff"),
      //maxWidth: 150,
      fontSize: xAxisLabelFontSize,
    });

    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        centerY: am5.percent(50),
        x: am5.percent(50),
        marginTop: 20,
        scale: 0.9,
        layout: root.horizontalLayout,
      })
    );
    legendRef.current = legend;

    legend.labels.template.setAll({
      oversizedBehavior: "truncate",
      fill: am5.color("#ffffff"),
      fontSize: legendFontSize,
      //textDecoration: "underline"
      //width: am5.percent(600),
      //fontWeight: '300',
    });

    function makeSeries(name: any, fieldName: any) {
      var series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          stacked: true,
          xAxis: xAxis,
          yAxis: yAxis,
          baseAxis: yAxis,
          valueXField: fieldName,
          valueXShow: "valueXTotalPercent",
          categoryYField: "category",
          fill:
            fieldName === "incomp"
              ? am5.color(chartSeriesFillColorIncomp)
              : am5.color(chartSeriesFillColorComp),
          stroke: am5.color(chartBorderLineColor),
        })
      );

      series.columns.template.setAll({
        fillOpacity: fieldName === "comp" ? 1 : 0.5,
        tooltipText: "{name}: {valueX}", // "{categoryY}: {valueX}",
        tooltipY: am5.percent(90),
        strokeWidth: chartBorderLineWidth,
      });
      series.data.setAll(chartData);

      series.appear();

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Label.new(root, {
            text:
              fieldName === "comp"
                ? "{valueXTotalPercent.formatNumber('#.')}%"
                : "",
            fill: root.interfaceColors.get("alternativeText"),
            opacity: fieldName === "incomp" ? 0 : 1,
            fontSize: seriesBulletLabelFontSize,
            centerY: am5.p50,
            centerX: am5.p50,
            populateText: true,
          }),
        });
      });

      // Click event
      // const find = dropdownData.find((emp: any) => emp.name === props.station);
      // const stationValue = find?.value;

      series.columns.template.events.on("click", (ev) => {
        const selected: any = ev.target.dataItem?.dataContext;
        const categorySelect: string = selected.category;
        // const selectedStatus: number | null =
        //   fieldName === 'comp' ? (fieldName === 'incomp' ? 1 : 4) : fieldName === 'delay' ? 3 : 1;

        if (categorySelect === buildingLayerCategory[0]) {
          stFoundationLayer.visible = true;
          stFramingLayer.visible = false;
          stColumnLayer.visible = false;
          floorsLayer.visible = false;
          wallsLayer.visible = false;
          stairsRailingLayer.visible = false;
          roomsLayer.visible = false;
          specialtyEquipmentLayer.visible = false;
        } else if (categorySelect === buildingLayerCategory[1]) {
          stFoundationLayer.visible = false;
          stFramingLayer.visible = true;
          stColumnLayer.visible = false;
          floorsLayer.visible = false;
          wallsLayer.visible = false;
          stairsRailingLayer.visible = false;
          roomsLayer.visible = false;
          specialtyEquipmentLayer.visible = false;
        } else if (categorySelect === buildingLayerCategory[2]) {
          stFoundationLayer.visible = false;
          stFramingLayer.visible = false;
          stColumnLayer.visible = true;
          floorsLayer.visible = false;
          wallsLayer.visible = false;
          stairsRailingLayer.visible = false;
          roomsLayer.visible = false;
          specialtyEquipmentLayer.visible = false;
        } else if (categorySelect === buildingLayerCategory[3]) {
          stFoundationLayer.visible = false;
          stFramingLayer.visible = false;
          stColumnLayer.visible = false;
          floorsLayer.visible = false;
          wallsLayer.visible = false;
          stairsRailingLayer.visible = false;
          roomsLayer.visible = false;
          specialtyEquipmentLayer.visible = false;
        } else if (categorySelect === buildingLayerCategory[4]) {
          stFoundationLayer.visible = false;
          stFramingLayer.visible = false;
          stColumnLayer.visible = false;
          floorsLayer.visible = true;
          wallsLayer.visible = false;
          stairsRailingLayer.visible = false;
          roomsLayer.visible = false;
          specialtyEquipmentLayer.visible = false;
        } else if (categorySelect === buildingLayerCategory[5]) {
          stFoundationLayer.visible = false;
          stFramingLayer.visible = false;
          stColumnLayer.visible = false;
          floorsLayer.visible = false;
          wallsLayer.visible = true;
          stairsRailingLayer.visible = false;
          roomsLayer.visible = false;
          specialtyEquipmentLayer.visible = false;
        } else if (categorySelect === buildingLayerCategory[6]) {
          stFoundationLayer.visible = false;
          stFramingLayer.visible = false;
          stColumnLayer.visible = false;
          floorsLayer.visible = false;
          wallsLayer.visible = false;
          stairsRailingLayer.visible = true;
          roomsLayer.visible = true;
          specialtyEquipmentLayer.visible = true;
        }

        arcgisScene?.view.on("click", () => {
          layerVisibleTrue();
        });
      });
      legend.data.push(series);
    }
    makeSeries(construction_status[2], "comp");
    makeSeries(construction_status[0], "incomp");
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  });

  const primaryLabelColor = "#9ca3af";
  const valueLabelColor = "#d1d5db";

  return (
    <>
      <div
        style={{
          color: primaryLabelColor,
          fontSize: "1.3rem",
          marginLeft: "13px",
          marginTop: "10px",
          marginBottom: "-5px",
        }}
      >
        Total Progress
      </div>
      <CalciteLabel layout="inline">
        <div
          style={{
            color: valueLabelColor,
            fontSize: "2.7rem",
            fontWeight: "bold",
            fontFamily: "calibri",
            lineHeight: "1.2",
            marginLeft: "30px",
          }}
        >
          {progress[2]} %
        </div>

        <img
          src="https://EijiGorilla.github.io/Symbols/Station_Structures_icon.png"
          alt="Utility Logo"
          height={"55px"}
          width={"55px"}
          style={{ marginLeft: "55%", display: "flex" }}
        />
      </CalciteLabel>
      <div
        style={{
          color: valueLabelColor,
          fontSize: "1rem",
          fontFamily: "calibri",
          lineHeight: "1.2",
          marginLeft: "30px",
        }}
      >
        ({thousands_separators(progress[0])})
      </div>

      <div
        id={chartID}
        style={{
          height: "60vh",
          backgroundColor: "rgb(0,0,0,0)",
          color: "white",
          marginRight: "10px",
          marginTop: "5%",
        }}
      ></div>
    </>
  );
};

export default Chart;
