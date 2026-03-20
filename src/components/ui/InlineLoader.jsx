import React from "react";

/**
 * InlineLoader – a small centered spinner shown inside a content area.
 * The rest of the page (sidebar, header) stays visible.
 * Usage: <InlineLoader /> inside any conditional render block.
 */
const InlineLoader = ({ label = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 w-full">
      {/* Spinning ring */}
      <div className="w-10 h-10 rounded-full border-4 border-gray-200 border-t-teal-500 animate-spin mb-3" />
      {/* Label */}
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  );
};

export default InlineLoader;
