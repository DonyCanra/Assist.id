import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataTransaction } from "../../../../store/actions/thunks";
import subtractDaysFromCurrentDate from "../../../../utils/subtractDaysFromCurrentDate";

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
      <Line data={data} height={400} options={options} />
    </div>
  );
};

export default LineChartTransaction;
