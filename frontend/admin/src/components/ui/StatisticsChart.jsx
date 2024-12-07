import React, { useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import useChart from "../../hooks/useChart";

// Register required components
ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Title);

const StatisticsChart = () => {
  const [timeframe, setTimeframe] = useState("month");
  const { data, loading, error } = useChart(timeframe);

  // Dữ liệu biểu đồ
  const chartData = {
    labels: data
      ? data.users.map((item) => `Tháng ${item._id}`) // Hiển thị label theo tháng
      : [],
    datasets: [
      {
        label: "Users",
        data: data ? data.users.map((item) => item.count) : [],
        backgroundColor: "rgba(54, 162, 235, 0.5)", // Xanh
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Products",
        data: data ? data.products.map((item) => item.count) : [],
        backgroundColor: "rgba(75, 192, 192, 0.5)", // Xanh lá
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10, // Tùy chỉnh bậc
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg mt-4">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Statistics</h2>

      {/* Chọn thời gian */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setTimeframe("week")}
          className={`px-4 py-2 rounded ${
            timeframe === "week" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Weekly
        </button>
        <button
          onClick={() => setTimeframe("month")}
          className={`px-4 py-2 rounded ${
            timeframe === "month" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setTimeframe("year")}
          className={`px-4 py-2 rounded ${
            timeframe === "year" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Yearly
        </button>
      </div>

      {/* Loading & Error */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Biểu đồ */}
      {!loading && data && <Bar data={chartData} options={chartOptions} />}
    </div>
  );
};

export default StatisticsChart;
