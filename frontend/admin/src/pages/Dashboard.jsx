// src/pages/Dashboard.jsx
import React from "react";
import PurchaseOverview from "../components/ui/PurchaseOverview.jsx";
import StatisticsChart from "../components/ui/StatisticsChart.jsx";

const Dashboard = () => {
  return (
    <div>
      <PurchaseOverview />
      <StatisticsChart />
    </div>
  );
};

export default Dashboard;
