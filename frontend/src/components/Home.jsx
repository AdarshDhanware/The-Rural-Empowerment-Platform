import React from "react";
import {Link} from "react-router-dom";
import heroImage from "../assets/rural-hero.jpg"; // Replace with your image path

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative">
        <img
          src={heroImage}
          alt="Rural Landscape"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
            Empowering Rural Communities
          </h1>
          <p className="text-center max-w-2xl mb-6">
            Join us in creating opportunities and enhancing lives in rural areas
            through sustainable employment and education initiatives.
          </p>
          <Link to='/all-services' className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg">
            Get Started
          </Link>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          About Rural Empowerment
        </h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Rural areas constitute about 70% of the world’s population. These
          regions often lack access to resources, employment opportunities, and
          education, which limits their growth and development. Our platform aims
          to bridge these gaps by providing tools, training, and connections to
          empower rural communities.
        </p>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-2xl font-bold text-gray-800">70%</h3>
            <p className="text-gray-600">of the population lives in rural areas</p>
          </div>
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-2xl font-bold text-gray-800">50%</h3>
            <p className="text-gray-600">unemployment rate in rural areas</p>
          </div>
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-2xl font-bold text-gray-800">30%</h3>
            <p className="text-gray-600">less access to education</p>
          </div>
        </div>
      </div>

      {/* Employment and Impact Section */}
      <div className="bg-gray-200 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Employment Opportunities
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            Our mission is to connect rural communities with job opportunities
            that match their skills. By working with local businesses and
            organizations, we create pathways to financial independence.
          </p>

        </div>
      </div>
    </div>
  );
};

export default Home;
