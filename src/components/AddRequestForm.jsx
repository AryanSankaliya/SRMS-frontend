import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddRequestForm() {
  const navigate = useNavigate();

  // Form State
  const [title, setTitle] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [category, setCategory] = useState("");
  const [department, setDepartment] = useState("");
  const [priority, setPriority] = useState(null);
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

  // Validation State
  const [errors, setErrors] = useState({});

  const categoryMap = {
    Hardware: ["Laptop Issue", "Printer Issue", "Mouse / Keyboard", "Screen Problem"],
    Software: ["OS Issue", "Application Error", "Installation Problem", "License Issue"],
    Network: ["WiFi Not Working", "LAN Issue", "Slow Internet"],
    Electrical: ["Power Failure", "Switch Board Issue"],
    Facilities: ["AC Problem", "Furniture Issue"],
    Other: ["Miscellaneous"],
  };

  const departments = [
    "IT Department",
    "Computer Science",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Administration",
    "Accounts",
  ];

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
    if (!serviceType) newErrors.serviceType = "Service type is required";
    if (!category) newErrors.category = "Category is required";
    if (!department) newErrors.department = "Department is required";
    if (!priority) newErrors.priority = "Priority is required";
    if (!description.trim()) newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      alert("Please fill in all required fields.");
      return;
    }

    // Colors for types
    const typeColors = {
      Hardware: { bg: "bg-blue-100", text: "text-blue-600" },
      Software: { bg: "bg-purple-100", text: "text-purple-600" },
      Network: { bg: "bg-pink-100", text: "text-pink-600" },
      Electrical: { bg: "bg-yellow-100", text: "text-yellow-600" },
      Facilities: { bg: "bg-orange-100", text: "text-orange-600" },
      Other: { bg: "bg-gray-100", text: "text-gray-600" },
    };

    const selectedColors = typeColors[serviceType] || typeColors["Other"];

    const newRequest = {
      id: `#REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      title,
      type: serviceType,
      typeBg: selectedColors.bg,
      typeText: selectedColors.text,
      status: "Pending", // Default status per user request
      statusBg: "bg-yellow-100",
      statusText: "text-yellow-600",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      priority,
      department,
      description
    };

    // Save to LocalStorage
    const existingRequests = JSON.parse(localStorage.getItem("requests")) || [];
    const updatedRequests = [newRequest, ...existingRequests]; // Add to top
    localStorage.setItem("requests", JSON.stringify(updatedRequests));

    alert("Request Submitted Successfully!");
    navigate("/user/requestlist");
  };

  const inputClass = (error) => `
    w-full border rounded-md px-4 py-2
    outline-none transition-all duration-300
    ${error ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"}
    focus:ring-4
    focus:shadow-lg focus:shadow-blue-200/50
    focus:-translate-y-[1px]
  `;

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow">
      {/* Header */}
      <h2 className="text-xl font-semibold mb-1">Request Details</h2>
      <p className="text-sm text-gray-500 mb-6">
        Please fill in the information below to submit a new ticket.
      </p>

      {/* Request Title */}
      <div className="mb-5">
        <label className="block text-sm font-medium mb-1">
          Request Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="E.g., Laptop screen flickering issue"
          className={inputClass(errors.title)}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
      </div>

      {/* Service Type & Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="block text-sm font-medium mb-1">
            Service Type <span className="text-red-500">*</span>
          </label>
          <select
            className={inputClass(errors.serviceType)}
            value={serviceType}
            onChange={(e) => {
              setServiceType(e.target.value);
              setCategory("");
            }}
          >
            <option value="">Select a type...</option>
            {Object.keys(categoryMap).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.serviceType && <p className="text-xs text-red-500 mt-1">{errors.serviceType}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className={inputClass(errors.category)}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={!serviceType}
          >
            <option value="">Select a category...</option>
            {serviceType &&
              categoryMap[serviceType]?.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
          </select>
          {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
        </div>
      </div>

      {/* Department & Priority */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="block text-sm font-medium mb-1">
            Department <span className="text-red-500">*</span>
          </label>
          <select
            className={inputClass(errors.department)}
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">Select your department...</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          {errors.department && <p className="text-xs text-red-500 mt-1">{errors.department}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Priority <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3">
            {[
              { value: "low", label: "● Low", color: "green", border: "border-green-400", bg: "bg-green-600", text: "text-green-600" },
              { value: "medium", label: "● Medium", color: "yellow", border: "border-yellow-500", bg: "bg-yellow-400", text: "text-yellow-400" },
              { value: "high", label: "● High", color: "red", border: "border-[#d00000]", bg: "bg-[#d00000]", text: "text-[#dc2f02]" }
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
      </div>

      {/* Description */}
      <div className="mb-5">
        <label className="block text-sm font-medium mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          rows="4"
          placeholder="Please describe the issue or request in detail..."
          className={inputClass(errors.description)}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
      </div>

      {/* Attachments */}
      <div>
        <label className="block text-sm font-medium mb-2">Attachments</label>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:border-blue-500 transition"
        >
          <input
            type="file"
            multiple
            accept=".png,.jpg,.jpeg,.pdf"
            className="hidden"
            id="fileUpload"
            onChange={(e) => handleFiles(e.target.files)}
          />

          <label htmlFor="fileUpload" className="cursor-pointer">
            <p className="text-blue-600 font-medium">Upload a file</p>
            <p className="text-sm text-gray-500">
              or drag and drop PNG, JPG, PDF up to 10MB
            </p>
          </label>
        </div>

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded"
              >
                <span className="text-sm truncate">{file.name}</span>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex justify-end gap-3">
        <button
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
        <button
          className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 transition shadow-md font-medium"
          onClick={handleSubmit}
        >
          Submit Request
        </button>
      </div>
    </div>
  );
}

export default AddRequestForm;
