import React, { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { FaUserPlus, FaExchangeAlt, FaEdit, FaTrash } from "react-icons/fa";

function TechnicianManagement() {
    const [activeTab, setActiveTab] = useState("technicians");
    const [technicians, setTechnicians] = useState([]);
    const [mappings, setMappings] = useState([]);
    const [loading, setLoading] = useState(false);

    // Forms
    const [techModal, setTechModal] = useState(false);
    const [mappingModal, setMappingModal] = useState(false);

    const [techForm, setTechForm] = useState({ firstName: "", lastName: "", email: "", password: "", mobile: "", designation: "Technician" });
    const [mappingForm, setMappingForm] = useState({ serviceRequestTypeId: "", staffId: "", fromDate: "", toDate: "", description: "" });

    const [reqTypes, setReqTypes] = useState([]);


    useEffect(() => {
        fetchData();
        fetchReqTypes();
    }, [activeTab]);

    const fetchReqTypes = async () => {
        try {
            const res = await api.get("/requestType/");
            if (!res.data.error) setReqTypes(res.data.data);
        } catch (err) { }
    }

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === "technicians") {
                const res = await api.get("/staff/");
                if (!res.data.error) {
                    // Filter inactive staff if needed, but show all active staff including HODs
                    setTechnicians(res.data.data.filter(s => s.isActive));
                }
            } else {
                const res = await api.get("/typeWisePerson/");
                if (!res.data.error) setMappings(res.data.data);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    };


    const handleCreateTech = async () => {
        try {
            const res = await api.post("/staff/", techForm);
            if (!res.data.error) {
                toast.success("Technician Created!");
                setTechModal(false);
                fetchData();
                setTechForm({ firstName: "", lastName: "", email: "", password: "", mobile: "", designation: "Technician" });
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Error creating technician");
        }
    };

    const handleCreateMapping = async () => {
        try {
            // Need user ID for createdByUserId - assume logged in user
            const user = JSON.parse(localStorage.getItem("user"));
            const payload = { ...mappingForm, createdByUserId: user._id, fromDate: new Date() };

            const res = await api.post("/typeWisePerson/", payload);
            if (!res.data.error) {
                toast.success("Mapping Created!");
                setMappingModal(false);
                fetchData();
                setMappingForm({ serviceRequestTypeId: "", staffId: "", fromDate: "", toDate: "", description: "" });
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Error creating mapping");
        }
    };


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Technician Management & Auto-Assignment</h1>

            {/* Tabs */}
            <div className="flex space-x-4 mb-6 border-b">
                <button
                    className={`pb-2 px-4 font-medium transition ${activeTab === "technicians" ? "border-b-2 border-teal-600 text-teal-600" : "text-gray-500 hover:text-gray-700"}`}
                    onClick={() => setActiveTab("technicians")}
                >
                    Manage Staff
                </button>
                <button
                    className={`pb-2 px-4 font-medium transition ${activeTab === "mappings" ? "border-b-2 border-teal-600 text-teal-600" : "text-gray-500 hover:text-gray-700"}`}
                    onClick={() => setActiveTab("mappings")}
                >
                    Auto-Assignment Rules
                </button>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-lg p-6 min-h-[400px]">
                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : activeTab === "technicians" ? (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Staff List</h2>
                            <button
                                onClick={() => setTechModal(true)}
                                className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition shadow"
                            >
                                <FaUserPlus /> Add New Staff
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-600">
                                <thead className="bg-gray-50 text-gray-700 uppercase font-medium">
                                    <tr>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Email</th>
                                        <th className="px-4 py-3">Mobile</th>
                                        <th className="px-4 py-3">Designation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {technicians.length > 0 ? technicians.map((tech) => (
                                        <tr key={tech._id} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium text-gray-900">{tech.firstName} {tech.lastName}</td>
                                            <td className="px-4 py-3">{tech.email}</td>
                                            <td className="px-4 py-3">{tech.mobile}</td>
                                            <td className="px-4 py-3">
                                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                                    {tech.designation}
                                                </span>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan="4" className="text-center py-4">No technicians found.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Auto-Assignment Rules</h2>
                            <button
                                onClick={() => setMappingModal(true)}
                                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow"
                            >
                                <FaExchangeAlt /> Add New Rule
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mb-4 bg-yellow-50 p-2 rounded border border-yellow-200">
                            Note: Requests created with these types will be <b>automatically assigned</b> to the mapped technician.
                        </p>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-600">
                                <thead className="bg-gray-50 text-gray-700 uppercase font-medium">
                                    <tr>
                                        <th className="px-4 py-3">Request Type</th>
                                        <th className="px-4 py-3">Assigned Technician</th>
                                        <th className="px-4 py-3">Effective From</th>
                                        <th className="px-4 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mappings.length > 0 ? mappings.map((map) => (
                                        <tr key={map._id} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium text-gray-900">
                                                {map.serviceRequestTypeId?.serviceRequestTypeName}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-indigo-600">
                                                {map.staffId?.firstName} {map.staffId?.lastName}
                                            </td>
                                            <td className="px-4 py-3">
                                                {new Date(map.fromDate).toLocaleDateString('en-GB')}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded-full text-xs ${map.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                                    {map.isActive ? "Active" : "Inactive"}
                                                </span>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan="4" className="text-center py-4">No assignment rules found.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>

            {/* --- ADD TECH MODAL --- */}
            {techModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-xl shadow-2xl w-96">
                        <h3 className="text-xl font-bold mb-4">Add New Staff</h3>
                        <div className="flex gap-2 mb-3">
                            <input
                                className="w-1/2 border p-2 rounded outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="First Name"
                                value={techForm.firstName}
                                onChange={e => setTechForm({ ...techForm, firstName: e.target.value })}
                            />
                            <input
                                className="w-1/2 border p-2 rounded outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="Last Name"
                                value={techForm.lastName}
                                onChange={e => setTechForm({ ...techForm, lastName: e.target.value })}
                            />
                        </div>
                        <input
                            className="w-full border p-2 rounded mb-3 outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Email (Login ID)"
                            value={techForm.email}
                            onChange={e => setTechForm({ ...techForm, email: e.target.value })}
                        />
                        <input
                            className="w-full border p-2 rounded mb-3 outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Password"
                            type="password"
                            value={techForm.password}
                            onChange={e => setTechForm({ ...techForm, password: e.target.value })}
                        />
                        <input
                            className="w-full border p-2 rounded mb-3 outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Mobile Number"
                            value={techForm.mobile}
                            onChange={e => setTechForm({ ...techForm, mobile: e.target.value })}
                        />
                        <select
                            className="w-full border p-2 rounded mb-3 outline-none focus:ring-2 focus:ring-teal-500"
                            value={techForm.designation}
                            onChange={e => setTechForm({ ...techForm, designation: e.target.value })}
                        >
                            <option value="Technician">Technician</option>
                            <option value="HOD">HOD</option>
                        </select>
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={() => setTechModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                            <button onClick={handleCreateTech} className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">Create Account</button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- ADD MAPPING MODAL --- */}
            {mappingModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-xl shadow-2xl w-96">
                        <h3 className="text-xl font-bold mb-4">Create Auto-Assignment Rule</h3>

                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Request Type</label>
                        <select
                            className="w-full border p-2 rounded mb-3 outline-none focus:ring-2 focus:ring-indigo-500"
                            value={mappingForm.serviceRequestTypeId}
                            onChange={e => setMappingForm({ ...mappingForm, serviceRequestTypeId: e.target.value })}
                        >
                            <option value="">-- Select Type --</option>
                            {reqTypes.map(type => (
                                <option key={type._id} value={type._id}>{type.serviceRequestTypeName}</option>
                            ))}
                        </select>

                        <label className="block text-sm font-medium text-gray-700 mb-1">Assign To Technician</label>
                        <select
                            className="w-full border p-2 rounded mb-3 outline-none focus:ring-2 focus:ring-indigo-500"
                            value={mappingForm.staffId}
                            onChange={e => setMappingForm({ ...mappingForm, staffId: e.target.value })}
                        >
                            <option value="">-- Select Technician --</option>
                            {technicians.map(tech => (
                                <option key={tech._id} value={tech._id}>{tech.firstName} {tech.lastName}</option>
                            ))}
                        </select>



                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={() => setMappingModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                            <button onClick={handleCreateMapping} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Confirm Mapping</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default TechnicianManagement;
