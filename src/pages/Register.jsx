import React, { useState } from "react";
import logo from "../../assets/Login page logo.png";
import Illustration from "../../assets/Illustration.png";
import { FaEnvelope, FaLock, FaUser, FaPhone, FaIdCard, FaBuilding } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../src/services/api";

import toast from "react-hot-toast";

function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        enrollmentNo: "",
        mobile: "",
        department: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            setLoading(false);
            return;
        }

        try {
            // Exclude confirmPassword before sending
            const { confirmPassword, ...registerData } = formData;

            // 3. Register endpoint change
            const response = await api.post("/user/register", registerData);

            if (response.data.error) {
                toast.error("Registration Failed: " + response.data.message);
                setLoading(false);
                return;
            }

            toast.success("Registration Successful! Please Login.");
            navigate("/login");
        } catch (error) {
            console.error("Registration Error:", error);
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
            <div className="w-1/2 min-h-screen flex flex-col items-center justify-between py-20">
                <div className="flex flex-col items-center text-center gap-5">
                    <div className="w-[96px] h-[96px] bg-gradient-to-br from-[#00b4d8] to-[#0077b6] rounded-2xl flex items-center justify-center shadow-md">
                        <img src={logo} alt="SRMS Logo" className="h-[48px] object-contain" />
                    </div>
                    <p className="text-[#1f2937] text-lg font-semibold leading-snug">
                        <span className="block">Service Request</span>
                        <span className="block">Management System</span>
                    </p>
                    <p className="text-gray-500 text-sm max-w-[320px] leading-relaxed mt-4">
                        Join the platform for efficient service request management.
                    </p>
                </div>
                <div className="mt-8">
                    <img src={Illustration} alt="SRMS Illustration" className="w-[320px] object-contain" />
                </div>
            </div>

            {/* Right Section */}
            <div className="w-1/2 flex items-center justify-center py-10">
                <form className="w-full max-w-xl bg-white rounded-lg p-8 shadow-lg space-y-4">
                    <h4 className="text-2xl font-semibold">User Registration</h4>
                    <p className="text-gray-600">Create your account to get started</p>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="text-gray-700 text-sm">First Name</label>
                            <div className="relative w-full">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FaUser />
                                </span>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-400 box-border"
                                />
                            </div>
                        </div>
                        <div className="w-1/2">
                            <label className="text-gray-700 text-sm">Last Name</label>
                            <div className="relative w-full">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FaUser />
                                </span>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-400 box-border"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-700 text-sm">Email Address</label>
                        <div className="relative w-full">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <FaEnvelope />
                            </span>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-400 box-border"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="text-gray-700 text-sm">Enrollment No.</label>
                            <div className="relative w-full">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FaIdCard />
                                </span>
                                <input
                                    type="text"
                                    name="enrollmentNo"
                                    placeholder="Enrollment No"
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-400 box-border"
                                />
                            </div>
                        </div>
                        <div className="w-1/2">
                            <label className="text-gray-700 text-sm">Mobile</label>
                            <div className="relative w-full">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FaPhone />
                                </span>
                                <input
                                    type="text"
                                    name="mobile"
                                    placeholder="Mobile Number"
                                    onChange={handleChange}
                                    className="w-full border rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-400 box-border"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-700 text-sm">Department</label>
                        <div className="relative w-full">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <FaBuilding />
                            </span>
                            <select
                                name="department"
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-400 box-border bg-white text-gray-700 appearance-none"
                                defaultValue=""
                            >
                                <option value="" disabled>Select Department</option>
                                {[
                                    "Computer Science",
                                    "Information Technology",
                                    "Mechanical",
                                    "Civil",
                                    "Electrical",
                                    "Electronics",
                                    "Administration"
                                ].map((dept) => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="text-gray-700 text-sm">Password</label>
                            <div className="relative w-full">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FaLock />
                                </span>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-400 box-border"
                                />
                            </div>
                        </div>
                        <div className="w-1/2">
                            <label className="text-gray-700 text-sm">Confirm Password</label>
                            <div className="relative w-full">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FaLock />
                                </span>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-400 box-border"
                                />
                            </div>
                        </div>
                    </div>


                    <button
                        onClick={handleRegister}
                        disabled={loading}
                        className={`w-full text-white py-2 rounded-lg transition mt-4
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-tr from-blue-400 to-teal-500 hover:opacity-90"}`}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>

                    <p className="text-center text-gray-600 text-sm">
                        Already have an account?{" "}
                        <span
                            className="text-blue-500 hover:underline cursor-pointer"
                            onClick={() => navigate("/login")}
                        >
                            Login here
                        </span>
                    </p>

                    <p className="text-center text-gray-400 text-sm mt-4">
                        © 2025 Service Request Management System. All rights reserved.
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;
