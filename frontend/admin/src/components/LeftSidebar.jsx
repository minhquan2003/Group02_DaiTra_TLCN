import React from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaHandshake,
  FaComments,
  FaListAlt,
  FaBell,
  FaCogs,
  FaSignOutAlt,
} from "react-icons/fa";

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
              className="flex items-center text-sm hover:text-blue-500 p-2 rounded text-gray-500"
            >
              <FaTachometerAlt className="mr-2" /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="flex items-center text-sm hover:text-blue-500 p-2 rounded text-gray-500"
            >
              <FaUsers className="mr-2" /> Users Account
            </Link>
          </li>
          <li>
            <Link
              to="/admin/posts"
              className="flex items-center text-sm hover:text-blue-500 p-2 rounded text-gray-500"
            >
              <FaBoxOpen className="mr-2" /> Product Posts
            </Link>
          </li>
          <li>
            <Link
              to="/admin/partner"
              className="flex items-center text-sm hover:text-blue-500 p-2 rounded text-gray-500"
            >
              <FaHandshake className="mr-2" /> Partner
            </Link>
          </li>
          <li>
            <Link
              to="/admin/feedbacks"
              className="flex items-center text-sm hover:text-blue-500 p-2 rounded text-gray-500"
            >
              <FaComments className="mr-2" /> Customer Feedbacks
            </Link>
          </li>
          <li>
            <Link
              to="/admin/category"
              className="flex items-center text-sm hover:text-blue-500 p-2 rounded text-gray-500"
            >
              <FaListAlt className="mr-2" /> Category Management
            </Link>
          </li>
          <li>
            <Link
              to="/admin/notifications"
              className="flex items-center text-sm hover:text-blue-500 p-2 rounded text-gray-500"
            >
              <FaBell className="mr-2" /> Notifications
            </Link>
          </li>
          <li>
            <Link
              to="/admin/regulation"
              className="flex items-center text-sm hover:text-blue-500 p-2 rounded text-gray-500"
            >
              <FaListAlt className="mr-2" /> Regulation Management
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-4 bg-white">
        <Link
          to="/settings"
          className="flex items-center text-sm hover:text-blue-500 p-2 rounded text-gray-500"
        >
          <FaCogs className="mr-2" /> Settings
        </Link>
        <Link
          to="/logout"
          className="flex items-center text-sm hover:text-blue-500 p-2 rounded mt-2 text-gray-500"
        >
          <FaSignOutAlt className="mr-2" /> Log Out
        </Link>
      </div>
    </div>
  );
};

export default LeftSidebar;
