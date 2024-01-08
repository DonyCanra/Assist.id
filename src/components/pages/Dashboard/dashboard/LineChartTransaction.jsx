import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataTransaction } from "../../../../store/actions/thunks";
import subtractDaysFromCurrentDate from "../../../../utils/subtractDaysFromCurrentDate";
import FilterDate from "../Filter/FilterDate";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChartTransaction = () => {
  const { transaction } = useSelector((state) => {
    return state.transaction;
  });

  const [input, setInput] = useState({
    startDate: subtractDaysFromCurrentDate(0),
    endDate: subtractDaysFromCurrentDate(0),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataTransaction(input));
  }, [dispatch, input]);

  const handleChange = (startDate, endDate) => {
    setInput({
      ...input,
      startDate: startDate,
      endDate: endDate,
    });
  };

  const data = {
    labels: transaction.map((x) => x.label),
    datasets: [
      {
        label: "Transaction",
        data: transaction.map((x) => x.value),
        backgroundColor: "#25B47A",
        borderColor: "#25B47A",
        borderWidth: 1,
        color: "red",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {},
    legend: {
      position: "bottom",
      labels: {
        fontSize: 250,
        color: "white",
      },
    },
  };

  return (
    <>
      <div className="row row-deck">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title text-white">DATA TRANSACTION</h3>
              <div className="card-options">
                <FilterDate input={input} onChange={handleChange} />
              </div>
            </div>
            <div className="card-body pt-0">
              <Line data={data} height={400} options={options} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LineChartTransaction;
