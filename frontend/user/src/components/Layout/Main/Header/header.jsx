import React, {useState, useEffect } from "react";
import nonAvata from '../../../../assets/img/nonAvata.jpg'
import {
  FiMenu,
  FiSearch,
  FiBell,
  FiMessageCircle,
  FiShoppingCart,
  FiUser,
  FiLogIn
} from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import NotificationIcon from "../../../Notification/NotificationIcon.jsx";

const Header = () => {
  const userInfoString = sessionStorage.getItem('userInfo');
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
  const avatarUrl = userInfo ? userInfo.avatar_url : nonAvata;
  const name = userInfo ? userInfo.name : "Guest!";
  const id = userInfo ? userInfo._id : null;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLinkClick = (path) => {
    if(userInfo){
      navigate(path);
    }else{
      alert("Bạn chưa đăng nhập!")
    }
    setDropdownOpen(false);
       // Đóng dropdown sau khi chọn link
  };

    const handleLogout = () => {
      sessionStorage.removeItem('userInfo');
      navigate('/');
  };

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
      <header className="bg-yellow-300 text-black justify-center flex items-center p-4 space-x-10">
        <div className="flex items-center">
          <div onClick={() => navigate('/')} className="text-lg font-bold">Logo</div>
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
              <NotificationIcon userId={id}/>
             {/* <FiBell className="h-5 w-5" /> Notification icon */}
          </span>
          <span className="cursor-pointer">
            <FiMessageCircle className="h-5 w-5" /> {/* Message icon */}
          </span>
          <span className="cursor-pointer" onClick={() => navigate('/cart')} title="Giỏ hàng">
            <FiShoppingCart className="h-5 w-5" /> {/* Shopping cart icon */}
          </span>
          <span className="ml-auto cursor-pointer" onClick={() => navigate('/login')} title="Đăng nhập">
            <div className="h-10 w-10 flex items-center justify-center text-black-500 hover:text-gray-700">
              <FiLogIn className="h-6 w-6" /> {/* Biểu tượng đăng nhập */}
            </div>
          </span>
          <span>
            <div className="ml-auto cursor-pointer" onClick={handleLogout} title="Đăng xuất">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
          </span>
          <span className="cursor-pointer" onClick={toggleDropdown}> 
            <div className="flex items-center space-x-3 p-2 bg-white rounded-md" title="Trang cá nhân">
              <img 
                  src={avatarUrl} 
                  alt={name} 
                  className="w-10 h-10 object-cover rounded-full border-2 border-gray-300" 
                  onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://via.placeholder.com/50'; // Placeholder nếu có lỗi
                  }}
              />
              <div className="flex flex-col">
                  <span className="font-semibold text-lg text-gray-800">{name}</span>
              </div>
          </div>
          {dropdownOpen && (
                <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button 
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            onClick={() => {
                              let path;
                              if (userInfo) {path = `/profile/${userInfo._id}`;} 
                              else {path = `/`;}
                              handleLinkClick(path)}}>
                            Chỉnh sửa hồ sơ
                        </button>
                        <button 
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            onClick={() => {
                              let path;
                              if (userInfo) {path = `/order/${userInfo._id}`;} 
                              else {path = `/`;}
                              handleLinkClick(path)}}>
                            Đơn hàng
                        </button>
                        <button 
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            onClick={() => navigate(`/post`)}>
                            Đăng tin bán hàng
                        </button>
                        {/* Thêm các liên kết khác nếu cần */}
                    </div>
                </div>
            )}
          </span>
        </div>
      </header>

      <hr className="border-t border-gray-300 w-full" />
    </>
  );
};

export default Header;
