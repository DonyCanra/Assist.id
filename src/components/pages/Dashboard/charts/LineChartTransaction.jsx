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

  const [input] = useState({
    startDate: subtractDaysFromCurrentDate(30),
    endDate: subtractDaysFromCurrentDate(0),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataTransaction(input));
  }, [dispatch, input]);

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
    <div>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="card">
            <div className="page-header card-header" style={{ margin: "0" }}>
              <div className="page-leftheader">
                <h4 className="page-title text-primary" style={{ fontSize: "16px" }}>
                  DATA TRANSACTION
                </h4>
              </div>
              <div className="page-rightheader">
                <FilterDate handleFetch={fetchDataTransaction} />
              </div>
            </div>
            <div className="card-body pt-0">
              <Line data={data} height={400} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineChartTransaction;
