import React from "react";
import { User } from "../types";
import Logout from "./Logout";
interface ChatContainerProps {
  currentChat: User;
}
export default function ChatContainer({ currentChat }: ChatContainerProps) {
  return (
    <div className="pt-4">
      <div className="flex justify-between items-center px-8">
        <div className="flex items-center gap-4">
          <div>
            <img
              className="h-12"
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">
              {currentChat.username}
            </h3>
          </div>
        </div>
        <Logout />
      </div>
      <div></div>
      <div></div>
    </div>
  );
}
