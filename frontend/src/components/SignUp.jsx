import React, { useState } from "react";
import axios from "axios"; // Import Axios
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom"; // For navigation after success
import api from "../axiosConfig";

const SignUp = () => {
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); // For redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password Match Validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Axios POST request to register the user
      const response = await api.post("/api/users/register", {
        username: name,
        phoneNo,
        password,
      });

      // If the response is successful
      if (response.status === 201) {
        alert(response.data.message || "User registered successfully! Please login.");
        navigate("/"); // Redirect to home page
      }
    } catch (error) {
      // Handle Errors
        const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";

        if (error.response?.status === 409) {
          // If user already exists
          alert("User already registered. Please login!");
          navigate("/login"); // Redirect to login page
        } else {
          // Other errors
          alert(errorMessage);
        }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96 md:w-80 lg:w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Phone No */}
          <div className="mb-4">
            <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-600">
              Phone No
            </label>
            <input
              type="tel"
              pattern="[0-9]{10}"
              maxLength="10"
              id="phoneNo"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
