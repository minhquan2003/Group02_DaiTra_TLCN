import React from "react";
import {
  FiMenu,
  FiSearch,
  FiBell,
  FiMessageCircle,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";

const Header = () => {
  return (
    <>
      {/* Header Top */}
      <div className="bg-black text-white flex justify-center items-center p-2 space-x-4">
        <div className="text-sm">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        </div>
        <div className="tex-sm">
          <a href="'#" className="hover: underline">
            ShopNow
          </a>
        </div>
      </div>

      {/* Header Main */}
      <header className="bg-white text-black justify-center flex items-center p-4 space-x-10">
        <div className="flex items-center">
          <div className="text-lg font-bold">Logo</div>
          <nav className="ml-6">
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="flex items-center">
                  {/* Hamburger icon before "Danh mục" */}
                  <FiMenu className="mr-2" />
                  Danh mục
                  {/* Arrow icon after "Danh mục" */}
                  <IoIosArrowForward className="ml-2" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center bg-gray-100 rounded-md overflow-hidden w-[40vw]">
          <input
            type="text"
            placeholder="Từ khóa"
            className="bg-gray-100 p-2 w-full text-gray-700 focus:outline-none"
          />
          <button className="bg-gray-100 p-2 text-black">
            <FiSearch className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center space-x-6">
          <span className="cursor-pointer">
            <FiBell className="h-5 w-5" /> {/* Notification icon */}
          </span>
          <span className="cursor-pointer">
            <FiMessageCircle className="h-5 w-5" /> {/* Message icon */}
          </span>
          <span className="cursor-pointer">
            <FiShoppingCart className="h-5 w-5" /> {/* Shopping cart icon */}
          </span>
          <span className="cursor-pointer">
            <FiUser className="h-5 w-5" /> {/* User icon */}
          </span>
        </div>
      </header>

      <hr className="border-t border-gray-300 w-full" />
    </>
  );
};

export default Header;
