import { FC } from "react";
import { ResponsiveLine } from "@nivo/line";

interface Props {
   xData: number[];
   yData: number[];
   xAxisLabel: string;
   yAxisLabel: string;
   graphTitle: string;
}

export const Graph: FC<Props> = ({ xData, yData, xAxisLabel, yAxisLabel, graphTitle }) => {
   // Подготовка данных для графика
   const data = [
      {
         id: yAxisLabel,
         data: xData.map((value, index) => ({
            x: value,
            y: yData[index],
         })),
      },
   ];

   // Настройки для графика
   const settings = {
      margin: { top: 50, right: 110, bottom: 50, left: 60 },
      xScale: { type: "linear" },
      yScale: { type: "linear", min: "auto", max: "auto", stacked: true, reverse: false },
      axisTop: null,
      axisRight: null,
      axisBottom: {
         legend: xAxisLabel,
         legendOffset: 36,
         legendPosition: "middle",
      },
      axisLeft: {
         legend: yAxisLabel,
         legendOffset: -40,
         legendPosition: "middle",
      },
      enableGridX: false,
      enableGridY: false,
      enablePoints: false,
      enableCrosshair: false,
      enableArea: true,
      areaOpacity: 0.2,
      colors: ["#00f"],
      lineWidth: 2,
      pointSize: 6,
      pointBorderWidth: 0,
      pointBorderColor: "#fff",
      pointLabel: "y",
      pointLabelYOffset: -12,
      useMesh: true,
      legends: [
         {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
               {
                  on: "hover",
                  style: {
                     itemBackground: "rgba(0, 0, 0, .03)",
                     itemOpacity: 1,
                  },
               },
            ],
         },
      ],
   };

   return (
      <div style={{ height: "400px" }}>
         <h2>{graphTitle}</h2>
         <ResponsiveLine data={data} {...settings} />
      </div>
   );
};
