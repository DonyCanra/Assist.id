import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { UserData } from "../../../constants/dataChart";

export default function LineChart({ chartData }) {
  const options = {
    scales: {
      x: {
        type: "category", // Ubah type menjadi "category"
        labels: UserData.map((data) => data.month), // Tentukan labels sesuai nama bulan
      },
    },
    plugins: {
      title: {
        color: "#fff", // Text color for the title
      },
    },
  };

  const coloredChartData = {
    ...chartData,
    datasets: chartData.datasets.map((dataset) => ({
      ...dataset,
      borderColor: "#25B47A", // Ubah warna sesuai keinginan Anda
    })),
  };

  return <Line data={coloredChartData} options={options} />;
}
