import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-hot-toast";
import { Edit2, Trash2, Plus } from "lucide-react";

function ServiceRequestTypeWisePerson() {
    const [mappings, setMappings] = useState([]);
    const [requestTypes, setRequestTypes] = useState([]);
    const [staffList, setStaffList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const user = JSON.parse(localStorage.getItem("user"));

    // Form State
    const [formData, setFormData] = useState({
        serviceRequestTypeId: "",
        staffId: "",
        fromDate: "",
        toDate: "",
        description: "",
        createdByUserId: user?._id || user?.userId
    });

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const [mappingRes, reqTypeRes, staffRes] = await Promise.all([
                api.get("/typeWisePerson/"),
                api.get("/requestType/"),
                api.get("/staff/")
            ]);

            if (!mappingRes.data.error) setMappings(mappingRes.data.data);
            if (!reqTypeRes.data.error) setRequestTypes(reqTypeRes.data.data);
            if (!staffRes.data.error) setStaffList(staffRes.data.data);

        } catch (error) {
            console.error(error);
            toast.error("Failed to load data");
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
                const res = await api.put(`/typeWisePerson/${editingId}`, payload);
                if (!res.data.error) {
                    toast.success("Mapping Updated!");
                } else {
                    toast.error(res.data.message);
                }
            } else {
                const res = await api.post("/typeWisePerson/", payload);
                if (!res.data.error) {
                    toast.success("Mapping Added!");
                } else {
                    toast.error(res.data.message);
                }
            }
            closeModal();
            fetchInitialData();
        } catch (error) {
            console.error(error);
            toast.error("Operation Failed");
        }
    };

    const handleEdit = (item) => {
        setEditingId(item._id);
        setFormData({
            serviceRequestTypeId: item.serviceRequestTypeId?._id || item.serviceRequestTypeId,
            staffId: item.staffId?._id || item.staffId,
            fromDate: item.fromDate ? item.fromDate.split('T')[0] : "",
            toDate: item.toDate ? item.toDate.split('T')[0] : "",
            description: item.description,
            createdByUserId: item.createdByUserId
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this mapping?")) return;
        try {
            const res = await api.delete(`/typeWisePerson/${id}`);
            if (!res.data.error) {
                toast.success("Deleted");
                fetchInitialData();
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
            serviceRequestTypeId: "",
            staffId: "",
            fromDate: "",
            toDate: "",
            description: "",
            createdByUserId: user?._id
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Type-Wise People</h2>
                    <p className="text-sm text-gray-500">Assign staff to specific request types</p>
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
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead className="bg-gray-50">
                                <tr className="text-sm font-semibold text-gray-600 border-b">
                                    <th className="py-3 px-4 whitespace-nowrap">Request Type</th>
                                    <th className="py-3 px-4 whitespace-nowrap">Staff Member</th>
                                    <th className="py-3 px-4 whitespace-nowrap">From Date</th>
                                    <th className="py-3 px-4 whitespace-nowrap">To Date</th>
                                    <th className="py-3 px-4 whitespace-nowrap">Description</th>
                                    <th className="py-3 px-4 whitespace-nowrap text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mappings.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-8 text-gray-400">
                                            No mappings found.
                                        </td>
                                    </tr>
                                ) : (
                                    mappings.map((item) => (
                                        <tr key={item._id} className="border-b last:border-none hover:bg-gray-50 text-sm">
                                            <td className="py-3 px-4 font-medium text-gray-800">{item.serviceRequestTypeId?.serviceRequestTypeName || "N/A"}</td>
                                            <td className="py-3 px-4 text-gray-600">
                                                {item.staffId?.name || "-"}
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">
                                                {item.fromDate ? new Date(item.fromDate).toLocaleDateString() : "-"}
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">
                                                {item.toDate ? new Date(item.toDate).toLocaleDateString() : "-"}
                                            </td>
                                            <td className="py-3 px-4 text-gray-600 max-w-xs truncate">{item.description || "-"}</td>
                                            <td className="py-3 px-4 flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
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
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 animate-in fade-in zoom-in duration-200">
                        <h3 className="text-lg font-bold mb-4">
                            {editingId ? "Edit Mapping" : "Add New Mapping"}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Request Type</label>
                                <select
                                    name="serviceRequestTypeId"
                                    value={formData.serviceRequestTypeId}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    <option value="">Select Request Type</option>
                                    {requestTypes.map(type => (
                                        <option key={type._id} value={type._id}>{type.serviceRequestTypeName}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Staff Member</label>
                                <select
                                    name="staffId"
                                    value={formData.staffId}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    <option value="">Select Staff</option>
                                    {staffList.map(staff => (
                                        <option key={staff._id} value={staff._id}>
                                            {staff.name} ({staff.email})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                                    <input
                                        type="date"
                                        name="fromDate"
                                        value={formData.fromDate}
                                        onChange={handleChange}
                                        required
                                        className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                                    <input
                                        type="date"
                                        name="toDate"
                                        value={formData.toDate}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Notes..."
                                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                                />
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

export default ServiceRequestTypeWisePerson;
