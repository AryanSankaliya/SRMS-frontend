import React, { useState } from 'react'
import logo from '../../assets/Login page logo.png'
import Illustration from '../../assets/Illustration.png'
import { FaEnvelope, FaLock, FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate()
  const [activeRole, setActiveRole] = useState("Admin")
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#F2F8FF] to-[#FFFFFF] flex w-full">

      {/* Left Section */}
      <div className="w-1/2 min-h-screen  flex flex-col items-center justify-between py-20">

        {/* Top Content */}
        <div className="flex flex-col items-center text-center gap-5">

          {/* Logo */}
          <div className="w-[96px] h-[96px] bg-gradient-to-br from-[#00b4d8] to-[#0077b6] rounded-2xl flex items-center justify-center shadow-md">
            <img
              src={logo}
              alt="SRMS Logo"
              className="h-[48px] object-contain"
            />
          </div>

          {/* Title */}
          <p className="text-[#1f2937] text-lg font-semibold leading-snug">
            <span className="block">Service Request</span>
            <span className="block">Management System</span>
          </p>

          {/* Description */}
          <p className="text-gray-500 text-sm max-w-[320px] leading-relaxed mt-4 ">
            A comprehensive platform for raising service requests, tracking progress,
            and improving issue resolution efficiency.
          </p>

        </div>

        {/* Bottom Illustration */}
        <div className="mt-8">
          <img
            src={Illustration}
            alt="SRMS Illustration"
            className="w-[320px] object-contain"
          />
        </div>
      </div>


      {/* Right Section */}
      <div className="w-1/2 flex items-center justify-center">

        <form className="w-full max-w-xl bg-white rounded-lg p-8 shadow-lg space-y-6">
          <h4 className="text-2xl font-semibold">Welcome Back</h4>
          <p className="text-gray-600">Sign in to access your dashboard</p>

          <div>
            <p className="mb-2 text-gray-700">Select Your Role</p>
            <div className="flex gap-4">
              <button type="button"
                onClick={() => setActiveRole("Admin")}
                className={`flex-1 border rounded-lg py-2 px-4 flex flex-col items-center justify-center gap-2 text-gray-700 transition-All duration-300 cursor-pointer 
                ${activeRole === "Admin"
                    ? "bg-green-100 border-green-500 text-green-950 shadow-md"
                    : "border-gray-300 text-gray-700 hover:bg-green-100 hover:border-green-400 hover:text-green-950"
                  }`}>
                <FaUserCircle className='text-4xl' />
                <span className="material-icons">Admin</span>
              </button>
              <button type="button"
                onClick={() => setActiveRole("Student")}
                className={`flex-1 border rounded-lg py-2 px-4 flex flex-col items-center justify-center gap-2 text-gray-700 transition-All duration-300 cursor-pointer 
                ${activeRole === "Student"
                    ? "bg-green-100 border-green-500 text-green-950 shadow-md"
                    : "border-gray-300 text-gray-700 hover:bg-green-100 hover:border-green-400 hover:text-green-950"
                  }`}>
                <FaUserCircle className='text-4xl' />
                <span className="material-icons">Student</span>
              </button>
              <button type="button"
                onClick={() => setActiveRole("Technician")}
                className={`flex-1 border rounded-lg py-2 px-4 flex flex-col items-center justify-center gap-2 text-gray-700 transition-All duration-300 cursor-pointer 
                ${activeRole === "Technician"
                    ? "bg-green-100 border-green-500 text-green-950 shadow-md"
                    : "border-gray-300 text-gray-700 hover:bg-green-100 hover:border-green-400 hover:text-green-950"
                  }`}> 
                <FaUserCircle className='text-4xl' />
                <span className="material-icons">Technician</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            {/* Email Input */}
            <label className="text-gray-700">Email Address</label>
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FaEnvelope /> {/* Gmail/email icon */}
              </span>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-400 box-border"
              />
            </div>

            {/* Password Input */}
            <label className="text-gray-700">Password</label>
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FaLock /> {/* Lock icon */}
              </span>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-400 box-border"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-gray-700">
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#" className="text-blue-500 text-sm hover:underline" onClick={() => navigate("/forgot-password")}>
              Forgot Password?
            </a>
          </div>

          <button className="w-full bg-gradient-to-tr from-blue-400 to-teal-500 text-white py-2 rounded-lg hover:opacity-90 transition">
            Sign In
          </button>

          <p className="text-center text-gray-400 text-sm">© 2025 Service Request Management System. All rights reserved.</p>
        </form>
      </div>


    </div>
  )
}

export default Login
