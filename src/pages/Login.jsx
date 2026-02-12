import React, { useState } from "react";
import logo from "../../assets/Login page logo.png";
import Illustration from "../../assets/Illustration.png";
import { FaEnvelope, FaLock, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../src/services/api";

import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState("Hod");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      navigate("/");
    }
  }, [navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let endpoint = "/staff/login";
      if (activeRole === "User") {
        endpoint = "/user/login";
      }

      const response = await api.post(endpoint, {
        email: email,
        password: password,
      });

      if (response.data.error) {
        toast.error(response.data.message);
        setLoading(false);
        return;
      }

      const user = response.data.data;
      let systemRole = "User";

      // Map backend designation to frontend role
      if (activeRole === "User") {
        systemRole = "User"; // Student/User is treated as User
      } else if (user.designation === "Admin" || user.designation === "HOD") {
        systemRole = "Hod";
      } else if (
        user.designation &&
        user.designation.toLowerCase().includes("technician")
      ) {
        systemRole = "Technician";
      } else {
        systemRole = "User";
      }

      const userData = {
        ...user,
        role: systemRole, // Save mapped role for Dashboard.jsx
        isLoggedIn: true,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      toast.success("Login Successful!");

      // Redirect based on mapped role
      // Redirect based on mapped role
      if (systemRole === "Hod") {
        navigate("/hod/dashboard");
      } else if (systemRole === "Technician") {
        navigate("/technician/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server Error! Make sure Backend is running.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#F2F8FF] to-[#FFFFFF] flex w-full">
      {/* Left Section */}
      <div className="w-1/2 min-h-screen  flex flex-col items-center justify-between py-20">
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
          <p className="text-gray-500 text-sm max-w-[320px] leading-relaxed mt-4 ">
            A comprehensive platform for raising service requests, tracking
            progress, and improving issue resolution efficiency.
          </p>
        </div>
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
              {/* Role Buttons - Inka use ab bas routing decide karne me ho raha hai */}
              {["Hod", "User", "Technician"].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setActiveRole(role)}
                  className={`flex-1 border rounded-lg py-2 px-4 flex flex-col items-center justify-center gap-2 text-gray-700 transition-all duration-300 cursor-pointer 
                  ${activeRole === role
                      ? "bg-green-100 border-green-500 text-green-950 shadow-md"
                      : "border-gray-300 text-gray-700 hover:bg-green-100 hover:border-green-400 hover:text-green-950"
                    }`}
                >
                  <FaUserCircle className="text-4xl" />
                  <span className="material-icons">{role}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <label className="text-gray-700">Email Address</label>
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FaEnvelope />
              </span>
              <input
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-400 box-border"
              />
            </div>

            <label className="text-gray-700">Password</label>
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FaLock />
              </span>
              <input
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-400 box-border"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-gray-700">
              <input type="checkbox" /> Remember me
            </label>
            <a
              href="#"
              className="text-blue-500 text-sm hover:underline"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </a>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading} // Loading ke time click band
            className={`w-full text-white py-2 rounded-lg transition 
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-tr from-blue-400 to-teal-500 hover:opacity-90"}`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <p className="text-center text-gray-400 text-sm">
            © 2025 Service Request Management System. All rights reserved.
          </p>

          {/* Register Link for Users */}
          <div className="text-center mt-4">
            <p className="text-gray-600 text-sm">
              Are you a new user?{" "}
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Register here
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
