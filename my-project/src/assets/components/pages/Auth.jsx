import React, { useState } from "react";
import { FaGoogle, FaLinkedin, FaEye, FaEyeSlash } from "react-icons/fa";
import dashboardImg from "./img/img1.png";
import google from "./img/google.png"; 

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [university, setUniversity] = useState("");
  const [agree, setAgree] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const universities = [
    "University of Delhi", "IIT Bombay", "IIT Delhi", "IIT Madras", "IIT Kanpur",
    "IIT Kharagpur", "JNU", "University of Calcutta", "University of Mumbai", "BHU",
    "Anna University", "Amrita Vishwa Vidyapeetham", "VIT", "Manipal", "AMU",
    "Pune University", "Jamia Millia Islamia", "IISc Bangalore", "IP University", "Osmania University",
    "BITS Pilani", "University of Hyderabad", "SRM Institute", "LPU", "Shiv Nadar University",
    "Ashoka University", "TISS", "Jadavpur University", "Christ University", "Panjab University",
  ];

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value === "") {
      setEmailError("");
    } else if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Email is required");
      return;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (!isSignIn) {
      if (!username) {
        alert("Username is required");
        return;
      }
      if (!agree) {
        alert("Please agree to the terms and conditions");
        return;
      }
    }

    console.log({ email, password, username, university });
  };

  const handleForgotPassword = () => {
    alert("Password reset instructions will be sent to your email.");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left: Form - Reduced top padding */}
<div className="w-full md:w-[60%] flex flex-col justify-center items-center px-4 sm:px-6 py-4 md:py-4">
        <div className="w-full max-w-md space-y-5">
          <div className="text-center md:text-left">
         
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {isSignIn ? "Welcome Back" : "Create your account"}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {isSignIn
                ? "Enter your email and password to access your account."
                : "Fill in the details below to sign up."}
            </p>
          </div>

          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setIsSignIn(true)}
              className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 ${
                isSignIn 
                  ? "bg-blue-600 text-white shadow-md hover:bg-blue-700" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignIn(false)}
              className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 ${
                !isSignIn 
                  ? "bg-blue-600 text-white shadow-md hover:bg-blue-700" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && (
                <p className="text-xs text-red-500 mt-1 pl-1">{emailError}</p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                {isSignIn && (
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {!isSignIn && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Username</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    University/College
                  </label>
                  <select
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    required
                  >
                    <option value="">Select your institution</option>
                    {universities.map((uni) => (
                      <option key={uni} value={uni}>
                        {uni}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agree"
                    checked={agree}
                    onChange={() => setAgree(!agree)}
                    className="mt-1 mr-3 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="agree" className="text-xs sm:text-sm text-gray-700">
                    I agree to the <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a>
                  </label>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isSignIn ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-gray-50 text-gray-500 text-sm">OR CONTINUE WITH</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex items-center justify-center py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md group flex-1">
              <div className="bg-white p-1.5 rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300">
                <img className="h-5" src={google} alt="none" />
              </div>
              <span className="ml-3 text-sm sm:text-base text-gray-700 group-hover:text-gray-900">
                Google
              </span>
            </button>
            <button className="flex items-center justify-center py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md group flex-1">
              <div className="bg-white p-1.5 rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300">
                <FaLinkedin className="text-blue-600 text-lg" /> 
              </div>
              <span className="ml-3 text-sm sm:text-base text-gray-700 group-hover:text-gray-900">
                LinkedIn
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Right: Illustration */}
<div className="hidden md:flex w-[40%] bg-gradient-to-br from-blue-600 to-indigo-700 text-white items-center justify-center p-4 lg:p-4">
        <div className="text-center space-y-5 max-w-sm 2xl:max-w-md">
          <div className="mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold leading-snug">
              Boost your skills through immersive real-world job simulations.
            </h2>
          </div>
          <p className="text-blue-100 text-base">
            Log in to access your job simulations and start building real-world skills.
          </p>
          <div className="mt-6">
            <div className="relative inline-block">
              <img
                src={dashboardImg}
                alt="Job simulation dashboard"
                className="w-full max-w-xs rounded-2xl shadow-2xl transform transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute -bottom-3 -right-3 bg-white text-blue-600 py-1.5 px-3 rounded-lg shadow-lg font-bold animate-pulse text-sm">
                Try Demo!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-only footer */}
      <div className="md:hidden py-4 text-center text-xs text-gray-500">
        © 2023 ZeTheta. All rights reserved.
      </div>
    </div>
  );
};

export default Auth;