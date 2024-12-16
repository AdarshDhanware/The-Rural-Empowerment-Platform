import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Update the path to match your file structure
import UserContext from "../context/UserContext";
import axios from "axios";

const Navbar = () => {
  const { login, setLogin } = useContext(UserContext)
  const navigate=useNavigate();
  const logout = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/users/logout",null,{withCredentials:true});

      // Clear login context on successful logout
      setLogin({
        phone: null,
        password: null,
      });
      navigate("/")
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout Error:", error.response?.data?.message || error.message);
      alert("Logout failed. Please try again.");
      navigate("/")
    }
  };

  return (
    <nav className="flex justify-between items-center bg-gray-800 p-4">
      {/* Logo and Company Name */}
      <Link to="/" className="flex items-center">
        <img src={logo} alt="Logo" className="w-10 h-auto invert mr-3" />
        <h1 className="text-white hidden md:block text-2xl font-bold">
          Rural Empowerment Platform
        </h1>
      </Link>

      {/* Links Section */}
      <div className="text-white">
        {login.phone !== null && login.password !==null ? (
          <div className="flex justify-center items-center space-x-4">
            <button onClick={logout} className="text-white bg-blue-500 px-5 py-2 rounded-lg hover:bg-blue-600">Log out</button>
          </div>
        ) : (
          <div className="flex justify-center items-center space-x-4">
            <Link to="/login" className="hover:text-blue-400">Login</Link>
            <Link to="/signup" className="text-white bg-blue-500 px-5 py-2 rounded-lg hover:bg-blue-600">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
