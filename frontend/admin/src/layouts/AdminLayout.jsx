import PropTypes from "prop-types";
import React from "react";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import AccountOverview from "../components/ui/AccountOverview";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex w-full h-full">
      {/* Left Sidebar */}
      <div className="w-1/6 text-blue-500 h-screen">
        <LeftSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 mx-4">
        <main>
          {/* AccountOverview component */}
          <AccountOverview />
          {children}
        </main>
      </div>

      {/* Right Sidebar */}
      <div className="w-1/4 text-blue-500">
        <RightSidebar />
      </div>
    </div>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
