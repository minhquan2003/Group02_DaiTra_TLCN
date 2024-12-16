// src/components/StatisticsChart.js
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatisticsChart = () => {
  const [year, setYear] = useState(2023); // Mặc định chọn năm 2023

  // Dữ liệu giả lập cho các tháng trong năm
  const data = {
    2023: {
      orders: [120, 130, 125, 140, 150, 160, 170, 165, 155, 145, 160, 175],
      posts: [100, 110, 115, 105, 120, 125, 130, 135, 140, 145, 150, 155],
    },
    2024: {
      orders: [100, 120, 110, 140, 145, 150, 160, 165, 170, 160, 150, 180],
      posts: [90, 100, 105, 115, 120, 130, 125, 135, 140, 155, 160, 165],
    },
  };

  // Chọn dữ liệu theo năm
  const selectedData = data[year];

  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Order",
        data: selectedData.orders,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Product",
        data: selectedData.posts,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Order & Product Statistics</h2>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value={2023}>2023</option>
          <option value={2024}>2024</option>
        </select>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default StatisticsChart;
