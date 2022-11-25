import { FormEvent, MouseEvent, useState } from "react";
import Picker, { IEmojiData } from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import "./ChatInput.scss";

interface ChatInputInterface {
  handleSendMsg: Function;
}

export default function ChatInput({ handleSendMsg }: ChatInputInterface) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => setShowEmojiPicker(!showEmojiPicker);

  const handleEmojiClick = (
    event: MouseEvent<Element, globalThis.MouseEvent>,
    data: IEmojiData
  ) => {
    let message = msg + data.emoji;
    setMsg(message);
  };

  const sendChat = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (msg.length === 0) return;
    handleSendMsg(msg);
    setMsg("");
  };
  return (
    <div
      className="grid items-center px-8 pb-1"
      style={{ backgroundColor: "#080420", gridTemplateColumns: "5% 95%" }}
    >
      <div className="flex items-center text-white gap-4">
        <div className="emoji">
          <BsEmojiSmileFill
            className="text-2xl cursor-pointer"
            style={{ color: "#ffff00c8" }}
            onClick={handleEmojiPickerHideShow}
          />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form
        className="w-full flex items-center gap-8 rounded-3xl bg-gray-700"
        onSubmit={(e) => sendChat(e)}
      >
        <input
          className=" w-11/12 bg-transparent border-none text-white pl-4 text-xl selection:bg-indigo-500 focus:outline-none"
          type="text"
          placeholder="Type your message."
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button
          className="py-1 px-8 flex justify-center items-center bg-indigo-500 border-none rounded-full"
          type="submit"
        >
          <IoMdSend className="text-3xl text-white" />
        </button>
      </form>
    </div>
  );
}
