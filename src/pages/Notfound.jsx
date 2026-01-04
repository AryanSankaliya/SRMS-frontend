import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-600 to-teal-600 text-white">
      <div className="flex flex-1 flex-col items-center justify-center text-center px-6">
        <AlertCircle className="w-20 h-20 text-white mb-6 animate-bounce" />
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-white/80 mb-6">
          Oops! The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-blue-100 transition"
        >
          Go to Dashboard
        </Link>
      </div>

      <footer className="bg-blue-700/80 py-6 mt-auto text-center">
        <p className="text-white/70 text-sm">
          © 2025 SRMS. All rights reserved. v1.0.0
        </p>
      </footer>
    </div>
  );
}
