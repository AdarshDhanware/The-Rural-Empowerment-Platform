import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axiosConfig";

const FindJob = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/jobs");
        const jobsData = Array.isArray(response.data.data) ? response.data.data : [];
        setJobs(jobsData);
        setError(null);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to load jobs.");
        setJobs([]);
        if (error.response?.status === 500) {
          alert("An error occurred while loading the jobs.");
          navigate("/all-services");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [navigate]);

  const filteredJobs = Array.isArray(jobs)
    ? jobs.filter((job) =>
      job.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-6 lg:px-12">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Find a Job</h1>

        {/* Search Bar */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search jobs by title or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Loading/Error Handling */}
        {loading ? (
          <p className="text-center text-gray-600">Loading jobs...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">{job.username}</h2>
                  <p className="text-sm text-gray-600 mb-2">Location: {job.location}</p>
                  <p className="text-sm text-gray-600 mb-2">Description: {job.description}</p>
                  <p className="text-sm text-gray-600">Salary: {job.wage}</p>
                  <button className="mt-4 bg-blue-600 text-white p-2 rounded-lg w-full hover:bg-blue-700">
                    Apply Now
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">No jobs found matching your criteria.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindJob;
