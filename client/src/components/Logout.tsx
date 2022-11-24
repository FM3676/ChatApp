import React from "react";
import { useNavigate } from "react-router";
import { BiPowerOff } from "react-icons/bi";

export default function Logout() {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <button
      className="flex justify-center items-center p-2 rounded-lg border-none cursor-pointer"
      style={{ backgroundColor: "#9a86fe" }}
      onClick={handleClick}
    >
      <BiPowerOff className="text-xl" style={{ color: "#ebe7ff" }} />
    </button>
  );
}
