import PropTypes from "prop-types";
import React from "react";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import AccountOverview from "../components/ui/AccountOverview";
import Navbar from "../components/Navbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-customBackground">
      <LeftSidebar />
      <div className="flex-1 flex flex-col bg-gray-200">
        <Navbar />
        <main className="flex-1 p-4 overflow-y-auto w-[71%]">
          {/* AccountOverview component */}
          <AccountOverview />
          {children}
        </main>
      </div>
      <RightSidebar />
    </div>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
