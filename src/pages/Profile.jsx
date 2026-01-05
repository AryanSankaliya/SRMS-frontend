import React from "react";
import {
  User,
  Mail,
  Building2,
  Briefcase,
  Camera,
  Phone,
  Lock
} from "lucide-react";
import Dashboard from "./Dashboard";

function Profile() {
  return (
    <>
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md grid grid-cols-1 md:grid-cols-3 overflow-hidden">

        {/* LEFT PROFILE CARD */}
        <div className="p-6 border-r bg-gray-50 flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="w-14 h-14 text-blue-600" />
          </div>

          <h2 className="mt-4 text-xl font-semibold">Alex Johnson</h2>

          <div className="flex items-center gap-2 mt-2">
            <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600 font-medium">
              USER
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
              Active
            </span>
          </div>

          <div className="w-full mt-6 space-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
              <Mail className="w-4 h-4 text-blue-500" />
              alex.j@company.com
            </div>

            <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
              <Building2 className="w-4 h-4 text-blue-500" />
              IT Department
            </div>

            <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
              <Briefcase className="w-4 h-4 text-blue-500" />
              Senior System Analyst
            </div>
          </div>

          <button className="mt-6 flex items-center gap-2 px-5 py-2 border rounded-lg text-blue-600 hover:bg-blue-50">
            <Camera className="w-4 h-4" />
            Change Avatar
          </button>
        </div>

        {/* RIGHT FORM */}
        <div className="md:col-span-2 p-8">
          {/* PERSONAL INFO */}
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-blue-600" />
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-4 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  defaultValue="Alex Johnson"
                  className="pl-10 mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-4 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  disabled
                  value="alex.j@company.com"
                  className="pl-10 mt-1 w-full border rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-4 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  defaultValue="+1 (555) 012-3456"
                  className="pl-10 mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Department</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-4 w-4 h-4 text-gray-400" />
                <select className="pl-10 mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none">
                  <option>IT Department</option>
                  <option>HR</option>
                  <option>Accounts</option>
                </select>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium">Designation</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-4 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  defaultValue="Senior System Analyst"
                  className="pl-10 mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
            </div>
          </div>

          {/* ACCOUNT SECURITY */}
          <h3 className="text-lg font-semibold flex items-center gap-2 mt-8 mb-4">
            <Lock className="w-5 h-5 text-blue-600" />
            Account Security
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">New Password</label>
              <input
                type="password"
                className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 mt-8">
            <button className="px-6 py-2 border rounded-lg hover:bg-gray-100">
              Cancel
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Profile;
