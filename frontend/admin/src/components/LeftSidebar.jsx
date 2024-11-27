import React from "react";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
  return (
    <div className="w-64 bg-white text-blue-500 h-full flex flex-col">
      <div className="flex items-center justify-center p-4 bg-white">
        <div className="text-xl font-bold text-customText">LOGO</div>
      </div>
      <div className="flex-1 px-4 py-6">
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              className="block text-lg hover:text-blue-500 p-2 rounded text-gray-500"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className="block text-lg hover:text-blue-500 p-2 rounded text-gray-500"
            >
              Users Account
            </Link>
          </li>
          <li>
            <Link
              to="/posts"
              className="block text-lg hover:text-blue-500 p-2 rounded text-gray-500"
            >
              Product Posts
            </Link>
          </li>
          <li>
            <Link
              to="/partner"
              className="block text-lg hover:text-blue-500 p-2 rounded text-gray-500"
            >
              Partner
            </Link>
          </li>
          <li>
            <Link
              to="/feedbacks"
              className="block text-lg hover:text-blue-500 p-2 rounded text-gray-500"
            >
              Customer Feedbacks
            </Link>
          </li>
          <li>
            <Link
              to="/category"
              className="block text-lg hover:text-blue-500 p-2 rounded text-gray-500"
            >
              Category Management
            </Link>
          </li>
          <li>
            <Link
              to="/notifications"
              className="block text-lg hover:text-blue-500 p-2 rounded text-gray-500"
            >
              Notifications
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-4 bg-white">
        <Link
          to="/settings"
          className="block text-lg hover:text-blue-500 p-2 rounded text-gray-500"
        >
          Settings
        </Link>
        <Link
          to="/logout"
          className="block text-lg hover:text-blue-500 p-2 rounded mt-2 text-gray-500"
        >
          Log Out
        </Link>
      </div>
    </div>
  );
};

export default LeftSidebar;
