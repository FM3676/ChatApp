import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { User } from "../types";
import { allUsersRoute } from "../utils/APIRoutes";

export default function Chat() {
  const navigate = useNavigate();
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
        className="h-4/5 w-4/5 grid grid-cols-10 md:grid-cols-4"
        style={{ backgroundColor: "#00000076" }}
      >
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        <div className="col-span-3">
          {currentChat ? (
            <ChatContainer currentChat={currentChat} />
          ) : (
            <Welcome currentUser={currentUser} />
          )}
        </div>
      </div>
    </div>
  );
}
