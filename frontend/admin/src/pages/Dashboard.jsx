// src/pages/Dashboard.jsx
import React from "react";
import AdminLayout from "../layouts/AdminLayout";

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome to the admin panel.</p>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
