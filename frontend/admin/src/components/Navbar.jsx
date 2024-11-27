import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          className="p-2 rounded border border-gray-300 w-64"
          placeholder="Search product, supplier, order"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
          {/* Replacing the SVG with a Font Awesome icon */}
          <i className="fas fa-search w-6 h-6 text-gray-600"></i>
        </button>
        <img
          src="https://www.w3schools.com/w3images/avatar2.png"
          alt="User"
          className="w-10 h-10 rounded-full border-2 border-gray-300"
        />
      </div>
    </nav>
  );
};

export default Navbar;
