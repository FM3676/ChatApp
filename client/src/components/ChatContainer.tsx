import axios from "axios";
import React, { useEffect, useState } from "react";
import { MessageList, User } from "../types";
import { getAllMessageRoute, sendMessageRout } from "../utils/APIRoutes";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import Message from "./Message";
interface ChatContainerProps {
  currentChat: User;
  currentUser: User;
}
export default function ChatContainer({
  currentChat,
  currentUser,
}: ChatContainerProps) {
  const [messages, setMessages] = useState<MessageList[]>([]);

  useEffect(() => {
    async function getAllMessages() {
      const response = await axios.post(getAllMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    }
    getAllMessages();
  }, [currentChat]);

  const handleSendMsg = async (msg: string) => {
    await axios.post(sendMessageRout, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
  };
  return (
    <div
      className="grid gap-1 h-full overflow-hidden pt-4"
      style={{ gridTemplateRows: "1fr 6fr 1fr" }}
    >
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
      <div className="py-4 px-8 flex flex-col gap-4 overflow-auto">
        {messages.map((message) => (
          <Message message={message} />
        ))}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
}
