import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";

const MyUploadedJobs = () => {

  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const { login } = useContext(UserContext);
  const [phoneNo, setPhoneNo] = useState(login.phone);


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.post("/api/users/your-jobs", { phoneNo: phoneNo }, {withCredentials:true});
        const jobsData = Array.isArray(response.data.data) ? response.data.data : [];
        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
        if (error.response?.status === 500) {
          alert("An error occurred while loading the jobs.");
          navigate("/all-services");
        }
      }
    }

    fetchJobs();
  }, [navigate]);

  // const jobs = [
  //   { title: "Farm Worker Needed", location: "Village A", date: "2024-12-01" },
  //   { title: "Electrician", location: "Village B", date: "2024-12-05" },
  // ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-6 lg:px-12">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Your Uploaded Jobs
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold text-gray-800 mb-2">{job.description}</h2>
              <p className="text-sm text-gray-600 mb-2">Location: {job.location}</p>
              <p className="text-sm text-gray-600">Date Posted: {job.createdAt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyUploadedJobs;
