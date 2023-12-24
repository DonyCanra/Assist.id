import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChartTransaction = () => {
  // Sample hardcoded data
  const sampleData = {
    coins: [
      { name: "Januari", price: 100 },
      { name: "Februari", price: 150 },
      { name: "Maret", price: 80 },
      { name: "April", price: 120 },
      { name: "Mei", price: 200 },
    ],
  };

  var data = {
    labels: sampleData.coins.map((x) => x.name),
    datasets: [
      {
        // label: `${sampleData.coins.length}`,
        data: sampleData.coins.map((x) => x.price),
        backgroundColor: "#25B47A",
        borderColor: "#25B47A",
        borderWidth: 1,
        color: "red",
      },
    ],
  };

  var options = {
    maintainAspectRatio: false,
    scales: {},
    legend: {
      position: "bottom", // Set legend position to bottom
      labels: {
        fontSize: 250,
        color: "white", // Set legend text color to white
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
