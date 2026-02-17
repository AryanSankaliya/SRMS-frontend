import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-hot-toast";
import { Edit2, Trash2, Plus } from "lucide-react";

function ServiceDepartmentMaster() {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // User info for createdByUserId
    const user = JSON.parse(localStorage.getItem("user"));

    // Form State (Matching Backend Model: ServiceDept)
    const [formData, setFormData] = useState({
        serviceDeptName: "",
        campusId: "6991fd6039194c27be69e401", // Valid Campus ID from DB
        description: "",
        ccEmailToCSV: "",
        isRequestTitleDisable: false,
        createdByUserId: user?._id || user?.userId // Fallback
    });

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        setLoading(true);
        try {
            // Backend Route is /dept/ (from index.js)
            const res = await api.get("/dept/");
            if (!res.data.error) {
                setDepartments(res.data.data);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch departments");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData, createdByUserId: user?._id || user?.userId };

            if (editingId) {
                // Update
                const res = await api.put(`/dept/${editingId}`, payload);
                if (!res.data.error) {
                    toast.success("Department Updated!");
                } else {
                    toast.error(res.data.message);
                }
            } else {
                // Create
                const res = await api.post("/dept/", payload);
                if (!res.data.error) {
                    toast.success("Department Added!");
                } else {
                    toast.error(res.data.message);
                }
            }
            closeModal();
            fetchDepartments();
        } catch (error) {
            console.error(error);
            toast.error("Operation Failed");
        }
    };

    const handleEdit = (dept) => {
        setEditingId(dept._id);
        setFormData({
            serviceDeptName: dept.serviceDeptName,
            campusId: dept.campusId, // Preserves ObjectId
            description: dept.description,
            ccEmailToCSV: dept.ccEmailToCSV,
            isRequestTitleDisable: dept.isRequestTitleDisable,
            createdByUserId: dept.createdByUserId
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this department?")) return;
        try {
            const res = await api.delete(`/dept/${id}`);
            if (!res.data.error) {
                toast.success("Department Deleted");
                fetchDepartments();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Delete Failed");
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({
            serviceDeptName: "",
            campusId: "6991fd6039194c27be69e401", // Reset to default valid ID
            description: "",
            ccEmailToCSV: "",
            isRequestTitleDisable: false,
            createdByUserId: user?._id
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Service Departments</h2>
                    <p className="text-sm text-gray-500">Manage support departments</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
                >
                    <Plus size={18} /> Add New
                </button>
            </div>

            {loading ? (
                <div className="text-center py-10 text-gray-500">Loading...</div>
            ) : (
                <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
                    {/* ONLY TABLE SCROLLS */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead className="bg-gray-50">
                                <tr className="text-sm font-semibold text-gray-600 border-b">
                                    <th className="py-3 px-4 whitespace-nowrap">Name</th>
                                    <th className="py-3 px-4 whitespace-nowrap">Description</th>
                                    <th className="py-3 px-4 whitespace-nowrap">CC Email</th>
                                    <th className="py-3 px-4 whitespace-nowrap">Title Disabled?</th>
                                    <th className="py-3 px-4 whitespace-nowrap text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {departments.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-8 text-gray-400">
                                            No departments found.
                                        </td>
                                    </tr>
                                ) : (
                                    departments.map((dept) => (
                                        <tr key={dept._id} className="border-b last:border-none hover:bg-gray-50 text-sm">
                                            <td className="py-3 px-4 font-medium text-gray-800">{dept.serviceDeptName}</td>
                                            <td className="py-3 px-4 text-gray-600 max-w-xs truncate" title={dept.description}>
                                                {dept.description}
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">{dept.ccEmailToCSV || "-"}</td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${dept.isRequestTitleDisable ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                                    {dept.isRequestTitleDisable ? "Yes" : "No"}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(dept)}
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(dept._id)}
                                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded transition"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
                        <h3 className="text-lg font-bold mb-4">
                            {editingId ? "Edit Department" : "Add New Department"}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    name="serviceDeptName"
                                    value={formData.serviceDeptName}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. IT Support"
                                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Brief description..."
                                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">CC Email (CSV)</label>
                                <input
                                    type="text"
                                    name="ccEmailToCSV"
                                    value={formData.ccEmailToCSV}
                                    onChange={handleChange}
                                    placeholder="manager@example.com, hod@example.com"
                                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>

                            {/* Hidden Campus ID */}
                            <input type="hidden" name="campusId" value={formData.campusId} />

                            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border">
                                <input
                                    type="checkbox"
                                    name="isRequestTitleDisable"
                                    checked={formData.isRequestTitleDisable}
                                    onChange={handleChange}
                                    id="disableTitle"
                                    className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 cursor-pointer"
                                />
                                <label htmlFor="disableTitle" className="text-sm text-gray-700 cursor-pointer select-none">Disable Request Title?</label>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 shadow-sm"
                                >
                                    {editingId ? "Update" : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ServiceDepartmentMaster;
