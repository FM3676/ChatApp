import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.svg";
import { User } from "../types";

interface ContactsProps {
  contacts: User[];
  currentUser: User;
  changeChat: (chat: User) => void;
}
export default function Contacts({
  contacts,
  currentUser,
  changeChat,
}: ContactsProps) {
  const [currentUserName, setCurrentUserName] = useState<string>("");
  const [currentUserImage, setCurrentUserImage] = useState<string>("");
  const [currentSelected, setCurrentSelected] = useState<number>();

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);
  const changeCurrentChat = (index: number, contact: User) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <div
          className="grid overflow-hidden grid-rows-6"
          style={{ backgroundColor: "#080420" }}
        >
          <div className="row-span-1 flex justify-center items-center gap-4">
            <img src={Logo} alt="logo" className="h-8" />
            <h3 className="text-white uppercase font-bold text-xl">snappy</h3>
          </div>
          <div className="row-span-4 flex flex-col items-center gap-3 overflow-auto">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className="w-11/12 cursor-pointer rounded p-2 gap-4 flex items-center transition-all"
                  style={{
                    backgroundColor:
                      index === currentSelected ? "#9186f3" : "#ffffff39",
                    minHeight: "5rem",
                  }}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div>
                    <img
                      className="h-12"
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      {contact.username}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className="row-span-1 flex justify-center items-center gap-2 md:gap-8"
            style={{ backgroundColor: "#0d0d30" }}
          >
            <div>
              <img
                className="h-16"
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div>
              <h2 className="text-white font-bold md:text-2xl">
                {currentUserName}
              </h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
