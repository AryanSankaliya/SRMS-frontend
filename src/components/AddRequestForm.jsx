import React, { useState } from "react";

function AddRequestForm() {
  const [Priority, setPriority] = useState(null);
  const [files, setFiles] = useState([]);
  const [serviceType, setServiceType] = useState("");
  const [category, setCategory] = useState("");

  const categoryMap = {
    Hardware: [
      "Laptop Issue",
      "Printer Issue",
      "Mouse / Keyboard",
      "Screen Problem",
    ],
    Software: [
      "OS Issue",
      "Application Error",
      "Installation Problem",
      "License Issue",
    ],
    Network: [
      "WiFi Not Working",
      "LAN Issue",
      "Slow Internet",
    ],
    Electrical: [
      "Power Failure",
      "Switch Board Issue",
    ],
    Facilities: [
      "AC Problem",
      "Furniture Issue",
    ],
    Other: ["Miscellaneous"],
  };

  const handleFiles = (selectedFiles) => {
    const validFiles = Array.from(selectedFiles).filter((file) => {
      const isValidType = [
        "image/png",
        "image/jpeg",
        "application/pdf",
      ].includes(file.type);

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

  const inputClass = `
    w-full border border-gray-300 rounded-md px-4 py-2
    outline-none transition-all duration-300
    focus:border-blue-500
    focus:ring-4 focus:ring-blue-200
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
          className={inputClass}
        />
      </div>

      {/* Service Type & Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="block text-sm font-medium mb-1">
            Service Type <span className="text-red-500">*</span>
          </label>
          <select
            className={inputClass}
            onChange={(e) => {
              setServiceType(e.target.value);
              setCategory("");
            }}
          >
            <option>Select a type...</option>
            <option>Hardware</option>
            <option>Software</option>
            <option>Network</option>
            <option>Electrical</option>
            <option>Facilities</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className={inputClass}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Select a category...</option>
            {serviceType &&
              categoryMap[serviceType]?.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Department & Priority */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="block text-sm font-medium mb-1">
            Department <span className="text-red-500">*</span>
          </label>
          <select className={inputClass}>
            <option>Select your department...</option>
            <option>IT Department</option>
            <option>Computer Science</option>
            <option>Mechanical Engineering</option>
            <option>Civil Engineering</option>
            <option>Electrical Engineering</option>
            <option>Administration</option>
            <option>Accounts</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Priority <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setPriority("low")}
              className={`px-6 py-2 border rounded-md border-green-400 ${
                Priority === "low"
                  ? "bg-green-600 text-white"
                  : "text-green-600 hover:bg-green-600 hover:text-white"
              }`}
            >
              ● Low
            </button>

            <button
              onClick={() => setPriority("medium")}
              className={`px-6 py-2 border rounded-md border-yellow-500 ${
                Priority === "medium"
                  ? "bg-yellow-400 text-white"
                  : "text-yellow-400 hover:bg-yellow-400 hover:text-white"
              }`}
            >
              ● Medium
            </button>

            <button
              onClick={() => setPriority("high")}
              className={`px-6 py-2 border rounded-md border-[#d00000] ${
                Priority === "high"
                  ? "bg-[#d00000] text-white"
                  : "text-[#dc2f02] hover:bg-[#d00000] hover:text-white"
              }`}
            >
              ● High
            </button>
          </div>
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
          className={inputClass}
        />
        <p className="text-xs text-gray-500 mt-1">
          Include any error messages or specific circumstances where the issue occurs.
        </p>
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
    </div>
  );
}

export default AddRequestForm;
