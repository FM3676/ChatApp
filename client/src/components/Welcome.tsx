import React from "react";
import { User } from "../types";
import Robot from "../assets/robot.gif";

interface WelcomeProps {
  currentUser: User;
}

export default function Welcome({ currentUser }: WelcomeProps) {
  return (
    <div className="flex justify-center items-center flex-col text-white h-full font-bold">
      <img className="h-80" src={Robot} alt="Robot" />
      <h1 className="text-2xl">
        Welcome, <span style={{color:"#4e00ff"}}>{currentUser.username}</span>
      </h1>
      <h3 className="text-md">Please select a chat to Start Messaging</h3>
    </div>
  );
}
