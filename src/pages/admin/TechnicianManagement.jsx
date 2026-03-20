import React, { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { Edit2, Trash2, Plus } from "lucide-react";
import { useConfirm } from "../../components/ui/ConfirmProvider";
import { getErrorMessage } from "../../utils/errorHandler";
import InlineLoader from "../../components/ui/InlineLoader";
import CustomSelect from "../../components/ui/CustomSelect";

function TechnicianManagement() {
    const confirm = useConfirm();
    const [activeTab, setActiveTab] = useState("mappings"); // default to auto-assignment
    const [loading, setLoading] = useState(false);

    // Reference Data Maps
    const [staffList, setStaffList] = useState([]);
    const [reqTypes, setReqTypes] = useState([]);

    // Tab Data
    const [technicians, setTechnicians] = useState([]);
    const [mappings, setMappings] = useState([]);

    // Forms & Modals
    const [techModal, setTechModal] = useState(false);
    const [mappingModal, setMappingModal] = useState(false);
    const [editingTechId, setEditingTechId] = useState(null);
    const [editingMappingId, setEditingMappingId] = useState(null);

    const [techForm, setTechForm] = useState({ firstName: "", lastName: "", email: "", password: "", mobile: "", designation: "Technician" });
    const [mappingForm, setMappingForm] = useState({ serviceRequestTypeId: "", staffId: "", description: "" });

    // Load reference data ONCE
    useEffect(() => {
        const fetchReferenceData = async () => {
            try {
                const [resStaff, resReq] = await Promise.all([
                    api.get("/staff/"),
                    api.get("/requestType/")
                ]);
                if (!resStaff.data.error) setStaffList(resStaff.data.data.filter(s => s.isActive));
                if (!resReq.data.error) setReqTypes(resReq.data.data);
            } catch (err) {
                console.error("Reference data load failed", err);
            }
        };
        fetchReferenceData();
    }, []);

    // Load active tab data
    useEffect(() => {
        fetchTabData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    const fetchTabData = async () => {
        setLoading(true);
        try {
            if (activeTab === "technicians") {
                const resStaff = await api.get("/staff/");
                const resMap = await api.get("/typeWisePerson/");
                if (!resStaff.data.error) {
                    let sList = resStaff.data.data.filter(s => s.isActive && s.designation && s.designation.toLowerCase() !== "hod");
                    if (!resMap.data.error) {
                        const allMappings = resMap.data.data;
                        sList = sList.map(tech => {
                            const techMappings = allMappings.filter(m => m.staffId?._id === tech._id && m.isActive);
                            const isMapped = techMappings.length > 0;
                            const mappedTypes = techMappings.map(m => m.serviceRequestTypeId?.serviceRequestTypeName).filter(Boolean).join(", ");
                            return {
                                ...tech,
                                isMapped,
                                mappedTypes
                            };
                        });
                    }
                    setTechnicians(sList);
                }
            } else if (activeTab === "mappings") {
                const res = await api.get("/typeWisePerson/");
                if (!res.data.error) setMappings(res.data.data);
            }
        } catch (error) {
            console.error(error);
            toast.error(getErrorMessage(error, "Failed to load data"));
        } finally {
            setLoading(false);
        }
    };


    // Handlers: Technical Staff
    const handleCreateTech = async () => {
        try {
            let res;
            // Omit password if editing and it's empty
            const payload = { ...techForm };
            if (editingTechId && !payload.password) {
                delete payload.password;
            }

            if (editingTechId) {
                res = await api.put(`/staff/${editingTechId}`, payload);
            } else {
                res = await api.post("/staff/", payload);
            }

            if (!res.data.error) {
                toast.success(editingTechId ? "Staff Updated!" : "Staff Created!");
                closeTechModal();
                fetchTabData();
            } else {
                toast.error(getErrorMessage(res.data.message));
            }
        } catch (error) {
            toast.error(getErrorMessage(error, "Error saving staff"));
        }
    };

    const handleEditTechClick = (tech) => {
        setEditingTechId(tech._id);
        setTechForm({
            firstName: tech.firstName,
            lastName: tech.lastName,
            email: tech.email,
            password: "",
            mobile: tech.mobile || "",
            designation: tech.designation || "Technician"
        });
        setTechModal(true);
    };

    const closeTechModal = () => {
        setTechModal(false);
        setEditingTechId(null);
        setTechForm({ firstName: "", lastName: "", email: "", password: "", mobile: "", designation: "Technician" });
    };

    const handleDeleteTech = async (id) => {
        const isConfirmed = await confirm("Delete Staff Member", "Are you sure you want to delete this staff member?");
        if (!isConfirmed) return;
        try {
            const res = await api.delete(`/staff/${id}`);
            if (!res.data.error) {
                toast.success("Staff deleted successfully!");
                fetchTabData();
            } else {
                toast.error(getErrorMessage(res.data.message));
            }
        } catch (error) {
            toast.error(getErrorMessage(error, "Error deleting staff"));
        }
    };

    // Handlers: Technical Staff
    const handleCreateMapping = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const payload = { ...mappingForm, createdByUserId: user._id, fromDate: new Date() };

            let res;
            if (editingMappingId) {
                res = await api.put(`/typeWisePerson/${editingMappingId}`, payload);
            } else {
                res = await api.post("/typeWisePerson/", payload);
            }

            if (!res.data.error) {
                toast.success(editingMappingId ? "Rule Updated!" : "Rule Created!");
                closeMappingModal();
                fetchTabData();
            } else {
                toast.error(getErrorMessage(res.data.message));
            }
        } catch (error) {
            toast.error(getErrorMessage(error, "Error saving rule"));
        }
    };

    const handleEditMappingClick = (map) => {
        setEditingMappingId(map._id);
        setMappingForm({
            serviceRequestTypeId: map.serviceRequestTypeId?._id || map.serviceRequestTypeId,
            staffId: map.staffId?._id || map.staffId,
            description: map.description || ""
        });
        setMappingModal(true);
    };

    const closeMappingModal = () => {
        setMappingModal(false);
        setEditingMappingId(null);
        setMappingForm({ serviceRequestTypeId: "", staffId: "", description: "" });
    };

    const handleDeleteMapping = async (id) => {
        const isConfirmed = await confirm("Remove Rule", "Are you sure you want to remove this rule?");
        if (!isConfirmed) return;
        try {
            const res = await api.delete(`/typeWisePerson/${id}`);
            if (!res.data.error) {
                toast.success("Rule removed");
                fetchTabData();
            } else toast.error(getErrorMessage(res.data.message));
        } catch (error) { toast.error(getErrorMessage(error, "Error removing rule")); }
    }


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Staff & Assignment Management</h1>

            {/* Tabs */}
            <div className="flex space-x-6 mb-6 border-b overflow-x-auto whitespace-nowrap">
                <button
                    className={`pb-2 px-2 font-medium transition ${activeTab === "mappings" ? "border-b-2 border-teal-600 text-teal-600" : "text-gray-500 hover:text-gray-700"}`}
                    onClick={() => setActiveTab("mappings")}
                >
                    Auto-Assignment Rules (Tech Linking)
                </button>
                <button
                    className={`pb-2 px-2 font-medium transition ${activeTab === "technicians" ? "border-b-2 border-teal-600 text-teal-600" : "text-gray-500 hover:text-gray-700"}`}
                    onClick={() => setActiveTab("technicians")}
                >
                    Manage Technicians
                </button>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-lg p-6 min-h-[400px]">
                {loading ? (
                    <InlineLoader label="Loading data..." />
                ) : activeTab === "mappings" ? (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h2 className="text-lg font-semibold">Auto-Assignment Rules</h2>
                                <p className="text-sm text-gray-500">
                                    Requests created with these types will be automatically assigned to the linked technician.
                                </p>
                            </div>
                            <button
                                onClick={() => setMappingModal(true)}
                                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow"
                            >
                                <Plus size={16} /> Add New Rule
                            </button>
                        </div>

                        <div className="overflow-x-auto mt-4">
                            <table className="w-full text-left text-sm text-gray-600">
                                <thead className="bg-gray-50 text-gray-700 uppercase font-medium">
                                    <tr>
                                        <th className="px-4 py-3">Request Type Category</th>
                                        <th className="px-4 py-3">Assigned Technician</th>
                                        <th className="px-4 py-3">Effective From</th>
                                        <th className="px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mappings.length > 0 ? mappings.map((map) => (
                                        <tr key={map._id} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium text-gray-900">
                                                {map.serviceRequestTypeId?.serviceRequestTypeName}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-indigo-600">
                                                {(() => {
                                                    const staffIdStr = map.staffId?._id || map.staffId;
                                                    const tech = staffList.find(s => s._id === staffIdStr);
                                                    return tech ? `${tech.firstName} ${tech.lastName}` : "Unknown";
                                                })()}
                                            </td>
                                            <td className="px-4 py-3">
                                                {(() => {
                                                    if (!map.fromDate) return "-";
                                                    const d = new Date(map.fromDate);
                                                    const day = String(d.getDate()).padStart(2, '0');
                                                    const month = String(d.getMonth() + 1).padStart(2, '0');
                                                    const year = d.getFullYear();
                                                    return `${day}/${month}/${year}`;
                                                })()}
                                            </td>
                                            <td className="px-4 py-3 flex justify-end gap-2 text-right">
                                                <button
                                                    onClick={() => handleEditMappingClick(map)}
                                                    className="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded-lg transition"
                                                    title="Edit Rule"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteMapping(map._id)}
                                                    className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg transition"
                                                    title="Remove Rule"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan="4" className="text-center py-4 text-gray-500">No assignment rules found.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h2 className="text-lg font-semibold">Technician & Staff List</h2>
                                <p className="text-sm text-gray-500">Manage technical staff accounts available for assignment.</p>
                            </div>
                            <button
                                onClick={() => setTechModal(true)}
                                className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition shadow"
                            >
                                <Plus size={16} /> Add New Staff
                            </button>
                        </div>

                        <div className="overflow-x-auto mt-4">
                            <table className="w-full text-left text-sm text-gray-600">
                                <thead className="bg-gray-50 text-gray-700 uppercase font-medium">
                                    <tr>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Email</th>
                                        <th className="px-4 py-3">Mapping Status</th>
                                        <th className="px-4 py-3">Mapped To</th>
                                        <th className="px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {technicians.length > 0 ? technicians.map((tech) => (
                                        <tr key={tech._id} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium text-gray-900">{tech.firstName} {tech.lastName}</td>
                                            <td className="px-4 py-3">{tech.email}</td>
                                            <td className="px-4 py-3">
                                                {tech.isMapped ? (
                                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Mapped</span>
                                                ) : (
                                                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">Unmapped</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-gray-700 text-sm">
                                                    {tech.mappedTypes || "None"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 flex justify-end gap-2 text-right">
                                                <button
                                                    onClick={() => handleEditTechClick(tech)}
                                                    className="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded-lg transition"
                                                    title="Edit Technician"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteTech(tech._id)}
                                                    className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg transition"
                                                    title="Delete Technician"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan="5" className="text-center py-4 text-gray-500">No technicians found.</td></tr>
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
                    <div className="bg-white p-6 rounded-xl shadow-2xl w-96 animate-in fade-in zoom-in duration-200">
                        <h3 className="text-xl font-bold mb-4">{editingTechId ? "Edit Staff" : "Add New Staff"}</h3>
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
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={closeTechModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                            <button onClick={handleCreateTech} className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">{editingTechId ? "Update Account" : "Create Account"}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- ADD AUTO ASSIGN MAPPING MODAL --- */}
            {mappingModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-xl shadow-2xl w-96 animate-in fade-in zoom-in duration-200">
                        <h3 className="text-xl font-bold mb-4">{editingMappingId ? "Edit Auto-Assignment Rule" : "Create Auto-Assignment Rule"}</h3>

                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Request Type Category</label>
                        <CustomSelect
                            className="mb-3"
                            value={mappingForm.serviceRequestTypeId}
                            name="serviceRequestTypeId"
                            onChange={e => setMappingForm({ ...mappingForm, serviceRequestTypeId: e.target.value })}
                        >
                            <option value="" disabled>-- Select Type Category --</option>
                            {reqTypes.map(type => (
                                <option key={type._id} value={type._id}>{type.serviceRequestTypeName}</option>
                            ))}
                        </CustomSelect>

                        <label className="block text-sm font-medium text-gray-700 mb-1">Assign To Technician</label>
                        <CustomSelect
                            className="mb-3"
                            value={mappingForm.staffId}
                            name="staffId"
                            onChange={e => setMappingForm({ ...mappingForm, staffId: e.target.value })}
                        >
                            <option value="" disabled>-- Select Technician --</option>
                            {/* We filter here so they mostly only see non-HODs for auto-assignment */}
                            {staffList.filter(s => s.designation && s.designation.toLowerCase() !== "hod").map(tech => (
                                <option key={tech._id} value={tech._id}>{tech.firstName} {tech.lastName} ({tech.designation})</option>
                            ))}
                        </CustomSelect>

                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={closeMappingModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                            <button onClick={handleCreateMapping} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">{editingMappingId ? "Update Rule" : "Confirm Rule"}</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default TechnicianManagement;
