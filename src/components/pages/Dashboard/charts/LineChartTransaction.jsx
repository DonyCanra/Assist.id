import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataTransaction } from "../../../../store/actions/thunks";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChartTransaction = () => {
  const { transaction } = useSelector((state) => {
    return state.transaction;
  });

  const [input] = useState({
    startDate: "2023-12-18",
    endDate: "2023-12-18",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataTransaction(input));
  }, [dispatch, input]);

  const dataChart = {
    transaction: Object.entries(transaction).map(([label, value]) => ({ label, value })),
  };

  const data = {
    labels: dataChart.transaction.map((x) => x.label),
    datasets: [
      {
        data: dataChart.transaction.map((x) => x.value),
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
