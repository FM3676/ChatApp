import React from "react";
import { User } from "../types";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import Message from "./Message";
interface ChatContainerProps {
  currentChat: User;
}
export default function ChatContainer({ currentChat }: ChatContainerProps) {
  const handleSendMsg = async (msg:any) => {}
  return (
    <div className="grid gap-1 h-full overflow-hidden" style={{gridTemplateRows:"1fr 6fr 1fr"}}>
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
      <Message />
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
}
