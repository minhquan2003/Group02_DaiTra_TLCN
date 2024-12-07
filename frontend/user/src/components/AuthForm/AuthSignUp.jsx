import { useState } from "react";
import PropTypes from "prop-types";
import {useNavigate} from 'react-router-dom';
import { useAuth } from "../../hooks/auth";
import imageLink from "../../assets/login/login.jpg";

const AuthSignUp = () => {
  const navigate = useNavigate();
  const { signup, error } = useAuth();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
  }
    signup({name, username, address, phone, email, password});
    setName('');
    setUsername('');
    setAddress('');
    setPhone('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    navigate('/login')
  };
  return (
    <div className="flex items-center min-h-screen bg-whitel w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full my-20">
        <div className="hidden md:flex items-center justify-start">
          <img src={imageLink} alt="Shopping" className="w-[90%] h-auto" />
        </div>

        <form
          className="max-w-sm mx-auto my-auto justify-start rounded-md bg-white w-full"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-semibold mb-4">Đăng Ký</h2>
          <p className="primary mb-6">Nhập thông tin để đăng ký</p>

          {error && <div className="text-red-500 mb-6">{error}</div>}

          <label className="block mb-4">
            <span className="sr-only">Họ tên</span>
            <input
              type="text"
              placeholder="Họ tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full py-3 border-b border-gray-300 focus:outline-none focus:border-red-500"
              required
            />
          </label>

          <label className="block mb-4">
            <span className="sr-only">Username</span>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full py-3 border-b border-gray-300 focus:outline-none focus:border-red-500"
              required
            />
          </label>

          <label className="block mb-4">
            <span className="sr-only">Địa chỉ</span>
            <input
              type="text"
              placeholder="Địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full py-3 border-b border-gray-300 focus:outline-none focus:border-red-500"
              required
            />
          </label>

          <label className="block mb-4">
            <span className="sr-only">Số điện thoại</span>
            <input
              type="text"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full py-3 border-b border-gray-300 focus:outline-none focus:border-red-500"
              required
            />
          </label>

          <label className="block mb-4">
            <span className="sr-only">Email</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-3 border-b border-gray-300 focus:outline-none focus:border-red-500"
              required
            />
          </label>

          <label className="block mb-4">
            <span className="sr-only">Mật Khẩu</span>
            <input
              type="password"
              placeholder="Mật Khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-3 border-b border-gray-300 focus:outline-none focus:border-red-500"
              required
            />
          </label>

          <label className="block mb-4">
            <span className="sr-only">Xác Nhận Mật Khẩu</span>
            <input
              type="password"
              placeholder="Xác Nhận Mật Khẩu"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full py-3 border-b border-gray-300 focus:outline-none focus:border-red-500"
              required
            />
          </label>

          <button
            type="submit"
            className="w-full bg-red-500 text-white p-3 rounded mt-4 font-semibold"
          >
            Đăng Ký
          </button>

          <div className="flex justify-start mt-4">
            <a href="/login"  className="text-sm text-blue-600 pr-5 underline">Đã có tài khoản?</a>
            <a href="#" className="text-red-500 text-sm underline">Quên mật khẩu?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

AuthSignUp.propTypes = {
  // onSubmit: PropTypes.func.isRequired, // Remove if not needed
};

export default AuthSignUp;
