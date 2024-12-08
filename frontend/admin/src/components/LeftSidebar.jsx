import React, { useState } from "react";
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
  const [activeLink, setActiveLink] = useState("/"); // default active link

  // Function to handle active link
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="w-64 bg-gray-100 text-blue-500 h-full flex flex-col">
      <div className="flex items-center justify-center p-4 bg-gray-100">
        <img src="../../public/images/logo.png" alt="Logo" className="h-22" />
      </div>

      <div className="flex-1 px-4 py-6">
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              onClick={() => handleLinkClick("/")}
              className={`flex items-center text-sm p-2 rounded ${
                activeLink === "/" ? "bg-blue-500 text-white" : "text-gray-500"
              }`}
            >
              <FaTachometerAlt className="mr-2" /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              onClick={() => handleLinkClick("/admin/users")}
              className={`flex items-center text-sm p-2 rounded ${
                activeLink === "/admin/users"
                  ? "bg-blue-500 text-white"
                  : "text-gray-500"
              }`}
            >
              <FaUsers className="mr-2" /> Users Account
            </Link>
          </li>
          <li>
            <Link
              to="/admin/posts"
              onClick={() => handleLinkClick("/admin/posts")}
              className={`flex items-center text-sm p-2 rounded ${
                activeLink === "/admin/posts"
                  ? "bg-blue-500 text-white"
                  : "text-gray-500"
              }`}
            >
              <FaBoxOpen className="mr-2" /> Product Posts
            </Link>
          </li>
          <li>
            <Link
              to="/admin/partner"
              onClick={() => handleLinkClick("/admin/partner")}
              className={`flex items-center text-sm p-2 rounded ${
                activeLink === "/admin/partner"
                  ? "bg-blue-500 text-white"
                  : "text-gray-500"
              }`}
            >
              <FaHandshake className="mr-2" /> Partner
            </Link>
          </li>
          <li>
            <Link
              to="/admin/feedbacks"
              onClick={() => handleLinkClick("/admin/feedbacks")}
              className={`flex items-center text-sm p-2 rounded ${
                activeLink === "/admin/feedbacks"
                  ? "bg-blue-500 text-white"
                  : "text-gray-500"
              }`}
            >
              <FaComments className="mr-2" /> Customer Feedbacks
            </Link>
          </li>
          <li>
            <Link
              to="/admin/category"
              onClick={() => handleLinkClick("/admin/category")}
              className={`flex items-center text-sm p-2 rounded ${
                activeLink === "/admin/category"
                  ? "bg-blue-500 text-white"
                  : "text-gray-500"
              }`}
            >
              <FaListAlt className="mr-2" /> Category Management
            </Link>
          </li>
          <li>
            <Link
              to="/admin/notifications"
              onClick={() => handleLinkClick("/admin/notifications")}
              className={`flex items-center text-sm p-2 rounded ${
                activeLink === "/admin/notifications"
                  ? "bg-blue-500 text-white"
                  : "text-gray-500"
              }`}
            >
              <FaBell className="mr-2" /> Notifications
            </Link>
          </li>
          <li>
            <Link
              to="/admin/regulation"
              onClick={() => handleLinkClick("/admin/regulation")}
              className={`flex items-center text-sm p-2 rounded ${
                activeLink === "/admin/regulation"
                  ? "bg-blue-500 text-white"
                  : "text-gray-500"
              }`}
            >
              <FaListAlt className="mr-2" /> Regulation Management
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
