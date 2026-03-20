import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../src/services/api";
import { useConfirm } from "../components/ui/ConfirmProvider";
import CustomSelect from "./ui/CustomSelect";

function AddRequestForm() {
  const navigate = useNavigate();
  const confirm = useConfirm();

  // Form State
  const [title, setTitle] = useState("");
  const [selectedTypeId, setSelectedTypeId] = useState("");
  const [department, setDepartment] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requestTypes, setRequestTypes] = useState([]);
  const [errors, setErrors] = useState({});

  const [departments, setDepartments] = useState([]);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [reqTypesRes, deptsRes] = await Promise.all([
          api.get("/requestType/"),
          api.get("/dept/")
        ]);

        if (!reqTypesRes.data.error) {
          setRequestTypes(reqTypesRes.data.data);
        } else {
          toast.error("Error loading types: " + reqTypesRes.data.message);
        }

        if (!deptsRes.data.error) {
          // Filter active departments if needed, or set all
          setDepartments(deptsRes.data.data.filter(d => d.isActive !== false));
        } else {
          toast.error("Error loading departments: " + deptsRes.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Could not load form data. Please try again.");
      }
    };

    fetchInitialData();
  }, []);

  const handleFiles = (selectedFiles) => {
    const validFiles = Array.from(selectedFiles).filter((file) => {
      const isValidType = ["image/png", "image/jpeg", "application/pdf"].includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      return isValidType && isValidSize;
    });
    setFiles((prev) => [...prev, ...validFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Request title is required";
    if (!selectedTypeId) newErrors.serviceType = "Service Category is required";
    if (!department) newErrors.department = "Department is required";
    if (!priority) newErrors.priority = "Priority is required";
    if (!description.trim()) newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      // Get selected department name to match existing backend text expected by `department` field
      // If backend expects the ObjectId, it should be adjusted, but `department: String` is defined in User model 
      // Assuming ServiceRequest model `department` field expects a string as it was passed string before.
      const selectedDeptObj = departments.find(d => d._id === department);
      const deptName = selectedDeptObj ? selectedDeptObj.serviceDeptName : department;

      const payload = {
        serviceRequestTypeId: selectedTypeId,
        serviceRequestTitle: title,
        serviceRequestDescription: description,
        priorityLevel: priority,
        department: deptName, // Currently passing string name for backward compatibility
        createdByUserId: user?._id || "self",
        userId: user?._id
      };

      const response = await api.post("/request/", payload);

      if (response.data.error) {
        toast.error("Error: " + response.data.message);
      } else {
        toast.success(response.data.message || "Request Submitted Successfully!");
        navigate("/user/requestlist");
      }

    } catch (error) {
      console.error("Submit Error:", error);
      toast.error("Server Error! Check Backend.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (error) => `
    w-full border rounded-md px-4 py-2
    outline-none transition-all duration-300
    ${error ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"}
    focus:ring-4
    focus:shadow-lg focus:shadow-blue-200/50
    focus:-translate-y-[1px]
  `;

  // Derived state: Filter request types based on selected department
  const filteredRequestTypes = department
    ? requestTypes.filter(rt => {
      // If RequestType has populated `serviceDeptId`, check its `_id`, else compare strings
      const typeDeptId = rt.serviceDeptId?._id || rt.serviceDeptId;
      return typeDeptId === department;
    })
    : [];

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-1">Request Details</h2>
      <p className="text-sm text-gray-500 mb-6">
        Please fill in the information below to submit a new ticket.
      </p>

      {/* Request Title */}
      <div className="mb-5">
        <label className="block text-sm font-medium mb-1">Request Title <span className="text-red-500">*</span></label>
        <input
          type="text"
          placeholder="E.g., Laptop screen flickering issue"
          className={inputClass(errors.title)}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {/* Department (First selected to filter categories) */}
        <div>
          <label className="block text-sm font-medium mb-1">Department <span className="text-red-500">*</span></label>
          <CustomSelect
            className={inputClass(errors.department)}
            value={department}
            name="department"
            onChange={(e) => {
              setDepartment(e.target.value);
              setSelectedTypeId(""); // Reset category when department changes
            }}
          >
            <option value="" disabled>Select department...</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>{dept.serviceDeptName}</option>
            ))}
          </CustomSelect>
          {errors.department && <p className="text-xs text-red-500 mt-1">{errors.department}</p>}
        </div>

        {/* Service Category (Dynamic, filtered by DB department) */}
        <div>
          <label className="block text-sm font-medium mb-1">Issue Category <span className="text-red-500">*</span></label>
          <CustomSelect
            className={inputClass(errors.serviceType)}
            value={selectedTypeId}
            name="selectedTypeId"
            onChange={(e) => setSelectedTypeId(e.target.value)}
            disabled={!department} // Disable if no department is selected
          >
            <option value="" disabled>
              {department ? "Select issue type..." : "Please select department first"}
            </option>
            {filteredRequestTypes.map((type) => (
              <option key={type._id} value={type._id}>
                {type.serviceRequestTypeName}
              </option>
            ))}
          </CustomSelect>
          {errors.serviceType && <p className="text-xs text-red-500 mt-1">{errors.serviceType}</p>}
        </div>
      </div>

      {/* Priority */}
      <div className="mb-5">
        <label className="block text-sm font-medium mb-2">Priority <span className="text-red-500">*</span></label>
        <div className="flex gap-3">
          {[
            { value: "Low", label: "● Low", color: "green", border: "border-green-400", bg: "bg-green-600", text: "text-green-600" },
            { value: "Medium", label: "● Medium", color: "yellow", border: "border-yellow-500", bg: "bg-yellow-400", text: "text-yellow-400" },
            { value: "High", label: "● High", color: "red", border: "border-[#d00000]", bg: "bg-[#d00000]", text: "text-[#dc2f02]" }
          ].map((p) => (
            <button
              key={p.value}
              onClick={() => setPriority(p.value)}
              className={`px-6 py-2 border rounded-md ${p.border} ${priority === p.value
                ? `${p.bg} text-white`
                : `${p.text} hover:${p.bg} hover:text-white`
                }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        {errors.priority && <p className="text-xs text-red-500 mt-1">{errors.priority}</p>}
      </div>

      {/* Description */}
      <div className="mb-5">
        <label className="block text-sm font-medium mb-1">Description <span className="text-red-500">*</span></label>
        <textarea
          rows="4"
          placeholder="Please describe the issue or request in detail..."
          className={inputClass(errors.description)}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
      </div>

      {/* Buttons */}
      <div className="mt-8 flex justify-end gap-3">
        <button
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          onClick={async () => {
             if (title || description || priority || department) {
                const isConfirmed = await confirm("Cancel Request Creation", "Are you sure you want to cancel? Any unsaved changes will be lost.");
                if (!isConfirmed) return;
             }
             window.history.back();
          }}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          className={`px-8 py-2 rounded-lg text-white transition shadow-md font-medium 
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </div>
    </div>
  );
}

export default AddRequestForm;