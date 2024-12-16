import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate=useNavigate();
  const {login}=useContext(UserContext);
  const [user,setUser]=useState("");
  const [phoneNo,setPhoneNo]=useState();

  useEffect( ()=>{
    const fetchProfile=async ()=>{
      try {
        const response=await axios.post("/api/users/profile",{phoneNo:login.phone},{withCredentials:true});
        setUser(response.data?.data?.username); 
        setPhoneNo(response.data?.data?.phoneNo); 
      } catch (error) {
        console.error("Failed to fetch profile:", error.response?.data?.message || error.message);
        alert("Failed to load profile. Please log in again.");
        navigate("/all-services");
      }
    }
    fetchProfile();
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Your Profile
        </h1>
        <div className="text-gray-700">
          <p className="mb-4">
            <strong>Name:</strong> {user}
          </p>
          <p>
            <strong>Phone:</strong> {phoneNo}
          </p>
        </div>
        <button
          className="mt-6 w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
