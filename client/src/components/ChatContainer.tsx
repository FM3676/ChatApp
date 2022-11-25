import axios from "axios";
import React, { LegacyRef, MutableRefObject, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { MessageList, User } from "../types";
import { getAllMessageRoute, sendMessageRout } from "../utils/APIRoutes";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import Message from "./Message";
interface ChatContainerProps {
  currentChat: User;
  currentUser: User;
  socket: MutableRefObject<Socket | undefined>;
}
export default function ChatContainer({
  currentChat,
  currentUser,
  socket,
}: ChatContainerProps) {
  const [messages, setMessages] = useState<MessageList[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState<MessageList>();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function getAllMessages() {
      if (!currentChat) return;
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
    socket.current!.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg: string) => {
        console.log(msg);
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  // useEffect(() => {
  //   scrollRef.current!.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  return (
    <div
      className="grid gap-1 overflow-hidden pt-4"
      style={{ gridTemplateRows: "15% 70% 15%",height:"85vh" }}
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
            <Message
              message={message}
              key={message.message + Math.random().toString()}
            />
        ))}{" "}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
}
