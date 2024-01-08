import { Chart } from "react-google-charts";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataWithdraw } from "../../../../store/actions/thunks";
import subtractDaysFromCurrentDate from "../../../../utils/subtractDaysFromCurrentDate";
import FilterDate from "../Filter/FilterDate";

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

  const [input, setInput] = useState({
    startDate: subtractDaysFromCurrentDate(0),
    endDate: subtractDaysFromCurrentDate(0),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataWithdraw(input));
  }, [dispatch, input]);

  const handleChange = (startDate, endDate) => {
    setInput({
      ...input,
      startDate: startDate,
      endDate: endDate,
    });
  };

  return (
    <>
      <div className="row" style={{ marginTop: "50px" }}>
        <svg style={{ marginTop: "10px", marginBottom: "10px" }} xmlns="http://www.w3.org/2000/svg" width="1661" height="8" viewBox="0 0 1661 8" fill="none">
          <path d="M0.957031 0.527344L1660.94 7.40462" stroke="#3B405B" />
        </svg>
      </div>


        <div className="row row-deck">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title text-white">DATA AMOUNT WITHDRAWAL</h3>
              <div className="card-options">
                <FilterDate input={input} onChange={handleChange} />
              </div>
            </div>
            <div className="card-body pt-0">
              <Chart chartType="LineChart" width="100%" height="400px" data={data} options={options} />;
            </div>
          </div>
        </div>
        </div>
    </>
  );
}
