import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-hot-toast";
import { Edit2, Trash2, Plus } from "lucide-react";

function ServiceTypeMaster() {
    const [serviceTypes, setServiceTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const user = JSON.parse(localStorage.getItem("user"));

    // Form State
    const [formData, setFormData] = useState({
        serviceTypeName: "",
        description: "",
        sequence: 0,
        isForStaff: false,
        isForUser: false,
        createdByUserId: user?._id || user?.userId
    });

    useEffect(() => {
        fetchServiceTypes();
    }, []);

    const fetchServiceTypes = async () => {
        setLoading(true);
        try {
            const res = await api.get("/type/"); // Route from index.js
            if (!res.data.error) {
                setServiceTypes(res.data.data);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch service types");
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
                const res = await api.put(`/type/${editingId}`, payload);
                if (!res.data.error) {
                    toast.success("Service Type Updated!");
                } else {
                    toast.error(res.data.message);
                }
            } else {
                // Create
                const res = await api.post("/type/", payload);
                if (!res.data.error) {
                    toast.success("Service Type Added!");
                } else {
                    toast.error(res.data.message);
                }
            }
            closeModal();
            fetchServiceTypes();
        } catch (error) {
            console.error(error);
            toast.error("Operation Failed");
        }
    };

    const handleEdit = (item) => {
        setEditingId(item._id);
        setFormData({
            serviceTypeName: item.serviceTypeName,
            description: item.description,
            sequence: item.sequence,
            isForStaff: item.isForStaff,
            isForUser: item.isForUser,
            createdByUserId: item.createdByUserId
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this service type?")) return;
        try {
            const res = await api.delete(`/type/${id}`);
            if (!res.data.error) {
                toast.success("Service Type Deleted");
                fetchServiceTypes();
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
            serviceTypeName: "",
            description: "",
            sequence: 0,
            isForStaff: false,
            isForUser: false,
            createdByUserId: user?._id
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Service Types</h2>
                    <p className="text-sm text-gray-500">Define broad service categories</p>
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
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead className="bg-gray-50">
                                <tr className="text-sm font-semibold text-gray-600 border-b">
                                    <th className="py-3 px-4 whitespace-nowrap">Name</th>
                                    <th className="py-3 px-4 whitespace-nowrap">Description</th>
                                    <th className="py-3 px-4 whitespace-nowrap">Seq</th>
                                    <th className="py-3 px-4 whitespace-nowrap">For Staff</th>
                                    <th className="py-3 px-4 whitespace-nowrap">For User</th>
                                    <th className="py-3 px-4 whitespace-nowrap text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serviceTypes.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-8 text-gray-400">
                                            No service types found.
                                        </td>
                                    </tr>
                                ) : (
                                    serviceTypes.map((item) => (
                                        <tr key={item._id} className="border-b last:border-none hover:bg-gray-50 text-sm">
                                            <td className="py-3 px-4 font-medium text-gray-800">{item.serviceTypeName}</td>
                                            <td className="py-3 px-4 text-gray-600 max-w-xs truncate" title={item.description}>
                                                {item.description}
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">{item.sequence}</td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.isForStaff ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                                                    {item.isForStaff ? "Yes" : "No"}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.isForUser ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'}`}>
                                                    {item.isForUser ? "Yes" : "No"}
                                                </span>
                                            </td>
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
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
                        <h3 className="text-lg font-bold mb-4">
                            {editingId ? "Edit Service Type" : "Add New Service Type"}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    name="serviceTypeName"
                                    value={formData.serviceTypeName}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Technical"
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sequence</label>
                                <input
                                    type="number"
                                    name="sequence"
                                    value={formData.sequence}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>

                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border flex-1">
                                    <input
                                        type="checkbox"
                                        name="isForStaff"
                                        checked={formData.isForStaff}
                                        onChange={handleChange}
                                        id="isForStaff"
                                        className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 cursor-pointer"
                                    />
                                    <label htmlFor="isForStaff" className="text-sm text-gray-700 cursor-pointer select-none">For Staff?</label>
                                </div>
                                <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border flex-1">
                                    <input
                                        type="checkbox"
                                        name="isForUser"
                                        checked={formData.isForUser}
                                        onChange={handleChange}
                                        id="isForUser"
                                        className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 cursor-pointer"
                                    />
                                    <label htmlFor="isForUser" className="text-sm text-gray-700 cursor-pointer select-none">For User?</label>
                                </div>
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

export default ServiceTypeMaster;
