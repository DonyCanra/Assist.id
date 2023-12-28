import { Chart } from "react-google-charts";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataWithdraw } from "../../../../store/actions/thunks";

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
  const { withdraw } = useSelector((state) => {
    return state.withdraw;
  });

  const originalData = {
    data: withdraw,
  };

  const transformData = (originalData) => {
    const transformedData = [["No", "DATA WITHDRAW"]];

    originalData.data.forEach((item) => {
      transformedData.push([item.label, item.value]);
    });

    return transformedData;
  };

  const data = transformData(originalData);

  const [input] = useState({
    startDate: "2023-12-18",
    endDate: "2023-12-18",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataWithdraw(input));
  }, [dispatch, input]);

  return <Chart chartType="LineChart" width="100%" height="400px" data={data} options={options} />;
}
