import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import Footer from "./components/Footer.jsx";
import AllServicesPage from "./components/AllServices.jsx";
import UploadJob from "./components/UploadJob.jsx";
import Profile from "./components/Profile.jsx";
import MyUploadedJobs from "./components/MyUploadedJobs.jsx";
import FindJob from "./components/FindJob.jsx";
import ForgetPassword from "./components/ForgetPassword.jsx";

const App = () => (

  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/all-services" element={<AllServicesPage/>} />
      <Route path="/upload-job" element={<UploadJob/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/uploaded-jobs" element={<MyUploadedJobs/>} />
      <Route path="/find-job" element={<FindJob />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
    </Routes>
    <Footer/>
  </Router>
);

export default App;