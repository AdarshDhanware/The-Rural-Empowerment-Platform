import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";

const AllServicesPage = () => {
  const services = [
    {
      title: "Upload Job",
      description: "Post a job to help others find opportunities.",
      icon: "https://cdn-icons-png.flaticon.com/512/3135/3135706.png", // Example icon
      link: "/upload-job",
    },
    {
      title: "View Profile",
      description: "See and update your profile information.",
      icon: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png", // Example icon
      link: "/profile",
    },
    {
      title: "Your Uploaded Jobs",
      description: "View the jobs you have posted so far.",
      icon: "https://cdn-icons-png.flaticon.com/512/609/609808.png", // Example icon
      link: "/uploaded-jobs",
    },
    {
      title: "Find Job",
      description: "Explore available jobs in your area.",
      icon: "https://cdn-icons-png.flaticon.com/512/3317/3317267.png", // Example icon
      link: "/find-job",
    },
  ];

  const { login, setLogin } = useContext(UserContext)

  if (!login.phone && !login.password) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <h1
          className="text-xl md:text-4xl text-center"
        >Please Login to Continue.</h1>
      </div>  
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-6 lg:px-12">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          All Services
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col items-center">
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-16 h-16 mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 text-center mb-4">
                  {service.description}
                </p>
                <Link
                  to={service.link}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Go to {service.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllServicesPage;
