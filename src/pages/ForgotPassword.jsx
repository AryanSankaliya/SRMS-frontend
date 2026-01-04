import React from "react";
import logo from '../../assets/Login page logo.png'
import Illustration from '../../assets/Illustration.png'
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";

function Forgot_Password() {
   const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#F2F8FF] to-[#FFFFFF] flex w-full">

      {/* Left Section */}
      <div className="w-1/2 min-h-screen flex flex-col items-center justify-between py-20">

        {/* Top Content */}
        <div className="flex flex-col items-center text-center gap-5">
          <div className="w-[96px] h-[96px] bg-gradient-to-br from-[#00b4d8] to-[#0077b6] rounded-2xl flex items-center justify-center shadow-md">
            <img
              src={logo}
              alt="SRMS Logo"
              className="h-[48px] object-contain"
            />
          </div>

          <p className="text-[#1f2937] text-lg font-semibold leading-snug">
            <span className="block">Service Request</span>
            <span className="block">Management System</span>
          </p>

          <p className="text-gray-500 text-sm max-w-[320px] leading-relaxed mt-4">
            Enter your registered email address and we’ll send you instructions
            to reset your password.
          </p>
        </div>

        {/* Illustration */}
        <div className="mt-8">
          <img
            src={Illustration}
            alt="Forgot Password Illustration"
            className="w-[320px] object-contain"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex items-center justify-center">
        <form className="w-full max-w-xl bg-white rounded-lg p-8 shadow-lg space-y-6">

          {/* Back to Login */}
          <div className="flex items-center gap-2 text-blue-500 cursor-pointer hover:underline text-sm">
            <FaArrowLeft />
            <span onClick={()=> navigate("/login")} >Back to Login</span>
          </div>

          <h4 className="text-2xl font-semibold">Forgot Password</h4>
          <p className="text-gray-600">
            Don’t worry, we’ll help you reset it.
          </p>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">Email Address</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FaEnvelope />
              </span>
              <input
                type="email"
                placeholder="Enter your registered email"
                className="w-full border rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Submit */}
          <button className="w-full bg-gradient-to-tr from-blue-400 to-teal-500 text-white py-2 rounded-lg hover:opacity-90 transition">
            Send Reset Link
          </button>

          {/* Footer Text */}
          <p className="text-center text-gray-400 text-sm">
            Secure Password Recovery • © {new Date().getFullYear()} SRMS
          </p>
        </form>
      </div>
    </div>
  );
}

export default Forgot_Password;
