import React from "react";
import { MessageList } from "../types";
import "./Message.scss";

export default function Message({ message }: { message: MessageList }) {
  return (
    <div
      className={`flex items-center ${
        message.fromSelf ? "sended" : "received"
      }`}
    >
      <div className="content break-words p-4 text-gray-50 rounded-2xl max-w-xl text-lg">
        <p>{message.message}</p>
      </div>
    </div>
  );
}
