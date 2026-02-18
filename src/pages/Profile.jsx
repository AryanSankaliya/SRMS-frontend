import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Building2,
  Briefcase,
  Camera,
  Phone,
  Lock,
  MapPin,
  Calendar,
} from "lucide-react";
import toast from "react-hot-toast";

function Profile() {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setFormData({
        firstName: parsedUser.firstName || "",
        lastName: parsedUser.lastName || "",
        mobile: parsedUser.mobile || "",
        password: "",
        confirmPassword: ""
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const updatedUser = {
      ...user,
      firstName: formData.firstName,
      lastName: formData.lastName,
      mobile: formData.mobile,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    toast.success("Profile updated successfully!");

    // Reload to reflect changes in header immediately
    setTimeout(() => window.location.reload(), 1000);
  };

  const roleColor =
    user.role === "Admin"
      ? "bg-purple-100 text-purple-600 border-purple-200"
      : user.role === "HOD"
        ? "bg-green-100 text-green-600 border-green-200"
        : user.role === "Technician"
          ? "bg-orange-100 text-orange-600 border-orange-200"
          : "bg-blue-100 text-blue-600 border-blue-200";

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 space-y-6">

      {/* Main Content Grid - Removed Cover Photo */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">

        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-100 to-blue-50 flex items-center justify-center text-4xl font-bold text-blue-600 mb-4">
                  {user.firstName ? user.firstName.charAt(0).toUpperCase() : <User />}
                </div>
                {/* <button className="absolute bottom-4 right-0 p-2 bg-white rounded-full shadow-sm border border-gray-200 text-gray-500 hover:text-blue-600 transition-colors">
                  <Camera className="w-4 h-4" />
                </button> */}
              </div>

              <h2 className="text-2xl font-bold text-gray-800">
                {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "User Name"}
              </h2>
              <p className="text-gray-500 text-sm mb-4">{user.email}</p>

              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${roleColor}`}>
                  {user.role || "User"}
                </span>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                  Active
                </span>
              </div>

              <div className="w-full border-t border-gray-100 pt-6 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  <span>{user.designation || "N/A"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <span>{user.department || "General Department"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Joined {new Date().getFullYear()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Settings Form */}
        <div className="lg:col-span-2 space-y-6">

          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
              <User className="w-5 h-5 text-blue-500" />
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={user.email || ""}
                    disabled
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Department</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none"
                    disabled
                  >
                    <option>{user.department || "General"}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95"
            >
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;
