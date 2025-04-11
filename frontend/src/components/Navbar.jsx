import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/Appcontext";

function Navbar() {
  const navigate = useNavigate(); // ✅ Fixed Typo
  const { token, setToken,userData } = useContext(AppContext); // ✅ Fixed Context

  const Logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">Home</li>
        </NavLink>

        <NavLink to="/doctors">
          <li className="py-1">All Doctors</li>
        </NavLink>

        <NavLink to="/about">
          <li className="py-1">About</li>
        </NavLink>

        <NavLink to="/contact">
          <li className="py-1">Contact</li>
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
  {token && userData ? (
    <div className="relative group flex items-center gap-2 cursor-pointer">
      <img className="w-8 rounded-full" src={assets.profile_pic} alt="Profile" />
      <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />

      <div className="absolute top-full left-0 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
        <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
          <p
            onClick={() => navigate("/my-profile")}
            className="hover:text-black cursor-pointer"
          >
            My Profile
          </p>
          <p
            onClick={() => navigate("/my-appointment")}
            className="hover:text-black cursor-pointer"
          >
            My Appointment
          </p>
          <p onClick={Logout} className="hover:text-black cursor-pointer">
            Logout
          </p>
        </div>
      </div>
    </div>
  ) : (
    <button
      onClick={() => navigate("/login")}
      className="bg-blue-600 text-white px-8 py-3 rounded-full font-light hidden md:block"
    >
      Create Account
    </button>
  )}
</div>

    </div>
  );
}

export default Navbar;
