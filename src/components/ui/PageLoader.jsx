import React from "react";

/**
 * PageLoader – a full-screen, minimal loading overlay.
 * Simple spinning ring with 3 bouncing dots.
 */
const PageLoader = ({ label = "Loading..." }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      {/* Spinning ring */}
      <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-teal-500 animate-spin mb-4" />

      {/* Label + dots */}
      <p className="text-gray-500 text-sm flex items-center gap-1">
        {label}
      </p>
    </div>
  );
};

export default PageLoader;
