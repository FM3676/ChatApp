import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { User } from "../types";
import { allUsersRoute, HOST } from "../utils/APIRoutes";
import { io, Socket } from "socket.io-client";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef<Socket>();
  const [contacts, setContacts] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState({} as User);
  const [currentChat, setcurrentChat] = useState<User>();

  const user = JSON.parse(localStorage.getItem("chat-app-user")!);

  useEffect(() => {
    async function redirectOrSetUser() {
      !user ? navigate("/login") : setCurrentUser(user);
    }
    redirectOrSetUser();
  }, []);

  useEffect(() => {
    if (user) {
      socket.current = io(HOST);
      socket.current.emit("add-user", user._id);
    }
  }, []);

  useEffect(() => {
    async function setTheUser() {
      if (!currentUser) return;

      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      }
      if (!user.isAvatarImageSet) navigate("/setAvatar");
    }
    setTheUser();
  }, [currentUser]);

  const handleChatChange = (chat: User) => {
    setcurrentChat(chat);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center gap-4 bg-slate-900">
      <div
        className="grid grid-cols-4"
        style={{ backgroundColor: "#00000076",height:"85vh",width:"85vw"}}
      >
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        <div className="col-span-3 h-full">
          {currentChat ? (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
            />
          ) : (
            <Welcome currentUser={currentUser} />
          )}
        </div>
      </div>
    </div>
  );
}
