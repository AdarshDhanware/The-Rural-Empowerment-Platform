import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../axiosConfig";

const UploadJob = () => {
  const { login, setLogin } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [wage, setWage] = useState(0);
  const [phoneNo] = useState(login.phone);
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !description || !location || !wage) {
      return alert("All fields are required.");
    }
    
    try {
      const response = await api.post("/api/jobs/upload-job", {
        username,
        description,
        location,
        wage,
        phoneNo,
      })

      if (response.status === 201) {
        alert(response.data.message || "Job uploaded successfully.")
        navigate("/all-services");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      if (error.response?.status === 500) {
        // If error while uploading a job
        alert("An error occurred while uploading the job.");
        navigate("/all-services"); // redirect to all-services page
      } else {
        alert(errorMessage);
      }
    }


  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white mt-5 mb-5 p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Upload a Job
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              User Name
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-600">
              Job Description
            </label>
            <textarea
              maxLength="500"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-40 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-600">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="wage" className="block text-sm font-medium text-gray-600">
              Wage (Note: All wages are expressed in INR.)
            </label>
            <input
              type="number"
              id="wage"
              value={wage}
              onChange={(e) => setWage(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* <div className="mb-6">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
              Phone No
            </label>
            <input
              type="tel"
              pattern="[0-9]{10}"
              maxLength="10"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div> */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadJob;
