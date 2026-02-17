import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-hot-toast";
import { Edit2, Trash2, Plus } from "lucide-react";

function ServiceDepartmentPersonMaster() {
    const [personMappings, setPersonMappings] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [staffList, setStaffList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const user = JSON.parse(localStorage.getItem("user"));

    // Form State
    const [formData, setFormData] = useState({
        serviceDeptId: "",
        staffId: "",
        fromDate: "",
        toDate: "",
        isHODStaff: false,
        description: "",
        createdByUserId: user?._id || user?.userId
    });

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const [mappingRes, deptRes, staffRes] = await Promise.all([
                api.get("/deptPerson/"),
                api.get("/dept/"),
                api.get("/staff/")
            ]);

            if (!mappingRes.data.error) setPersonMappings(mappingRes.data.data);
            if (!deptRes.data.error) setDepartments(deptRes.data.data);
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
                const res = await api.put(`/deptPerson/${editingId}`, payload);
                if (!res.data.error) {
                    toast.success("Mapping Updated!");
                } else {
                    toast.error(res.data.message);
                }
            } else {
                const res = await api.post("/deptPerson/", payload);
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
            serviceDeptId: item.serviceDeptId?._id || item.serviceDeptId,
            staffId: item.staffId?._id || item.staffId,
            fromDate: item.fromDate ? item.fromDate.split('T')[0] : "",
            toDate: item.toDate ? item.toDate.split('T')[0] : "",
            isHODStaff: item.isHODStaff,
            description: item.description,
            createdByUserId: item.createdByUserId
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this mapping?")) return;
        try {
            const res = await api.delete(`/deptPerson/${id}`);
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
            serviceDeptId: "",
            staffId: "",
            fromDate: "",
            toDate: "",
            isHODStaff: false,
            description: "",
            createdByUserId: user?._id
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Department People</h2>
                    <p className="text-sm text-gray-500">Assign staff to departments</p>
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
                                    <th className="py-3 px-4 whitespace-nowrap">Department</th>
                                    <th className="py-3 px-4 whitespace-nowrap">Staff Member</th>
                                    <th className="py-3 px-4 whitespace-nowrap">From Date</th>
                                    <th className="py-3 px-4 whitespace-nowrap">To Date</th>
                                    <th className="py-3 px-4 whitespace-nowrap">Is HOD?</th>
                                    <th className="py-3 px-4 whitespace-nowrap text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {personMappings.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-8 text-gray-400">
                                            No mappings found.
                                        </td>
                                    </tr>
                                ) : (
                                    personMappings.map((item) => (
                                        <tr key={item._id} className="border-b last:border-none hover:bg-gray-50 text-sm">
                                            <td className="py-3 px-4 font-medium text-gray-800">{item.serviceDeptId?.serviceDeptName || "-"}</td>
                                            <td className="py-3 px-4 text-gray-600">
                                                {item.staffId?.name || "-"}
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">
                                                {item.fromDate ? new Date(item.fromDate).toLocaleDateString() : "-"}
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">
                                                {item.toDate ? new Date(item.toDate).toLocaleDateString() : "-"}
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.isHODStaff ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'}`}>
                                                    {item.isHODStaff ? "Yes" : "No"}
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
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 animate-in fade-in zoom-in duration-200">
                        <h3 className="text-lg font-bold mb-4">
                            {editingId ? "Edit Mapping" : "Add New Mapping"}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">

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

                            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border">
                                <input
                                    type="checkbox"
                                    name="isHODStaff"
                                    checked={formData.isHODStaff}
                                    onChange={handleChange}
                                    id="isHODStaff"
                                    className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 cursor-pointer"
                                />
                                <label htmlFor="isHODStaff" className="text-sm text-gray-700 cursor-pointer select-none">Is HOD?</label>
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

export default ServiceDepartmentPersonMaster;
