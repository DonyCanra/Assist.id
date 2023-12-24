import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Year", "DATA AMOUNT WITHDRAWL"],
  ["2004", 40],
  ["2005", 46],
  ["2006", 11],
  ["2007", 54],
  ["2008", 54],
  ["2009", 54],
  ["2010", 54],
  ["2011", 54],
  ["2012", 54],
];

export const options = {
  curveType: "function",
  // legend: { position: "bottom" },
  backgroundColor: "#2B2E3F",
  hAxis: { textStyle: { color: "white" } },
  vAxis: { textStyle: { color: "white" } },
  titleTextStyle: { color: "#2B2E3F" },
  chartArea: { left: 40, right: 40, top: 40, bottom: 50 },
  series: {
    0: { color: "#18A0FB" }, // Set color of the first series (line)
  },
};

export default function LineChartWithdraw() {
  return <Chart chartType="LineChart" width="100%" height="400px" data={data} options={options} />;
}
