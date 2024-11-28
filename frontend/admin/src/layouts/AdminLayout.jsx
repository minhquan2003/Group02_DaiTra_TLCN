import PropTypes from "prop-types";
// src/layouts/AdminLayout.jsx
import React from "react";
import LeftSidebar from "../components/LeftSidebar";
import Navbar from "../components/Navbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-customBackground">
      <LeftSidebar />
      <div className="flex-1 flex flex-col bg-gray-200">
        <Navbar />
        {/* <main className="flex-1 p-6 overflow-y-auto">{children}</main> */}
      </div>
    </div>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
