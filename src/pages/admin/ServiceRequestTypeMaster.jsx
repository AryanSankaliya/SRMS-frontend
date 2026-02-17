import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-hot-toast";
import { Edit2, Trash2, Plus } from "lucide-react";

function ServiceRequestTypeMaster() {
    const [requestTypes, setRequestTypes] = useState([]);
    const [serviceTypes, setServiceTypes] = useState([]); // Dropdown 1
    const [departments, setDepartments] = useState([]);   // Dropdown 2
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const user = JSON.parse(localStorage.getItem("user"));

    // Form State
    const [formData, setFormData] = useState({
        serviceTypeId: "",
        serviceDeptId: "",
        serviceRequestTypeName: "",
        description: "",
        defaultPriorityLevel: "Low",
        isVisibleResource: true,
        isMandatoryResource: false,
        createdByUserId: user?._id || user?.userId
    });

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const [reqTypesRes, typesRes, deptsRes] = await Promise.all([
                api.get("/requestType/"), // Corrected Route
                api.get("/type/"),
                api.get("/dept/")
            ]);

            if (!reqTypesRes.data.error) setRequestTypes(reqTypesRes.data.data);
            if (!typesRes.data.error) setServiceTypes(typesRes.data.data);
            if (!deptsRes.data.error) setDepartments(deptsRes.data.data);

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
                // Update
                const res = await api.put(`/requestType/${editingId}`, payload);
                if (!res.data.error) {
                    toast.success("Updated Successfully!");
                } else {
                    toast.error(res.data.message);
                }
            } else {
                // Create
                const res = await api.post("/requestType/", payload);
                if (!res.data.error) {
                    toast.success("Created Successfully!");
                } else {
                    toast.error(res.data.message);
                }
            }
            closeModal();
            fetchInitialData(); // Refresh list
        } catch (error) {
            console.error(error);
            toast.error("Operation Failed");
        }
    };

    const handleEdit = (item) => {
        setEditingId(item._id);
        setFormData({
            serviceTypeId: item.serviceTypeId?._id || item.serviceTypeId, // Handle populated vs id
            serviceDeptId: item.serviceDeptId?._id || item.serviceDeptId,
            serviceRequestTypeName: item.serviceRequestTypeName,
            description: item.description,
            defaultPriorityLevel: item.defaultPriorityLevel,
            isVisibleResource: item.isVisibleResource,
            isMandatoryResource: item.isMandatoryResource,
            createdByUserId: item.createdByUserId
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this Request Type?")) return;
        try {
            const res = await api.delete(`/requestType/${id}`);
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
            serviceTypeId: "",
            serviceDeptId: "",
            serviceRequestTypeName: "",
            description: "",
            defaultPriorityLevel: "Low",
            isVisibleResource: true,
            isMandatoryResource: false,
            createdByUserId: user?._id
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Request Types</h2>
                    <p className="text-sm text-gray-500">Define specific service categories</p>
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
                                    <th className="py-3 px-4 whitespace-nowrap">Request Name</th>
                                    <th className="py-3 px-4 whitespace-nowrap">Service Type</th>
                                    <th className="py-3 px-4 whitespace-nowrap">Department</th>
                                    <th className="py-3 px-4 whitespace-nowrap">Priority</th>
                                    <th className="py-3 px-4 whitespace-nowrap">Visible?</th>
                                    <th className="py-3 px-4 whitespace-nowrap text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requestTypes.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-8 text-gray-400">
                                            No request types found.
                                        </td>
                                    </tr>
                                ) : (
                                    requestTypes.map((item) => (
                                        <tr key={item._id} className="border-b last:border-none hover:bg-gray-50 text-sm">
                                            <td className="py-3 px-4 font-medium text-gray-800">{item.serviceRequestTypeName}</td>
                                            <td className="py-3 px-4 text-gray-600">{item.serviceTypeId?.serviceTypeName || "N/A"}</td>
                                            <td className="py-3 px-4 text-gray-600">{item.serviceDeptId?.serviceDeptName || "N/A"}</td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                          ${item.defaultPriorityLevel === 'High' ? 'bg-red-100 text-red-700' :
                                                        item.defaultPriorityLevel === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                                                    {item.defaultPriorityLevel || "-"}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.isVisibleResource ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                                                    {item.isVisibleResource ? "Yes" : "No"}
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
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 animate-in fade-in zoom-in duration-200 lg:max-w-2xl">
                        <h3 className="text-lg font-bold mb-4">
                            {editingId ? "Edit Request Type" : "Add New Request Type"}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                                    <select
                                        name="serviceTypeId"
                                        value={formData.serviceTypeId}
                                        onChange={handleChange}
                                        required
                                        className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                                    >
                                        <option value="">Select Type</option>
                                        {serviceTypes.map(type => (
                                            <option key={type._id} value={type._id}>{type.serviceTypeName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                    <select
                                        name="serviceDeptId"
                                        value={formData.serviceDeptId}
                                        onChange={handleChange}
                                        required
                                        className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                                    >
                                        <option value="">Select Department</option>
                                        {departments.map(dept => (
                                            <option key={dept._id} value={dept._id}>{dept.serviceDeptName}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Request Type Name</label>
                                <input
                                    type="text"
                                    name="serviceRequestTypeName"
                                    value={formData.serviceRequestTypeName}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Broken Monitor"
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Default Priority</label>
                                <select
                                    name="defaultPriorityLevel"
                                    value={formData.defaultPriorityLevel}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                    <option value="Critical">Critical</option>
                                </select>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border flex-1">
                                    <input
                                        type="checkbox"
                                        name="isVisibleResource"
                                        checked={formData.isVisibleResource}
                                        onChange={handleChange}
                                        id="isVisibleResource"
                                        className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 cursor-pointer"
                                    />
                                    <label htmlFor="isVisibleResource" className="text-sm text-gray-700 cursor-pointer select-none">Visible to Users?</label>
                                </div>
                                <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border flex-1">
                                    <input
                                        type="checkbox"
                                        name="isMandatoryResource"
                                        checked={formData.isMandatoryResource}
                                        onChange={handleChange}
                                        id="isMandatoryResource"
                                        className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 cursor-pointer"
                                    />
                                    <label htmlFor="isMandatoryResource" className="text-sm text-gray-700 cursor-pointer select-none">Mandatory Resource?</label>
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

export default ServiceRequestTypeMaster;
