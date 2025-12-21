import React from 'react'
import logo from '/src/assets/logo.png'
import {FaUserCircle } from "react-icons/fa";

function Header() {
  return (
    <>
      <div className="bg-[#0C4A6E] h-[70px] flex items-center px-3">
        {/* Logo */}
        <img
          className="h-[65px] w-auto"
          src={logo}
          alt="logo"
        />

        {/* Title */}
        <h4 className="text-white text-2xl flex-grow">
          Service Request Management
        </h4>

        {/* Profile Icon */}
        <div className="flex items-center gap-2">
          <FaUserCircle size={32} className="text-white" />
          <h5 className="text-white text-lg">Aryan</h5>
        </div>
      </div>

    </>
  )
}

export default Header