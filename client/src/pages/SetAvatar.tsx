import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import { toastErrorLog } from "../utils/toastLog";
import "react-toastify/dist/ReactToastify.css";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";
import { setAvatarRoute } from "../utils/APIRoutes";

export default function SetAvatar() {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState<number>(NaN);

  const setProfilePicture = async () => {
    if (Number.isNaN(selectedAvatar))
      return toastErrorLog("Please select an avatar");

    const user = await JSON.parse(
      localStorage.getItem("chat-app-user") as string
    );
    const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
      image: avatars[selectedAvatar],
    });

    if (!data.isSet) toastErrorLog("Error setting avatar. Please try again.");

    user.isAvatarImageSet = true;
    user.avatarImage = data.image;
    localStorage.setItem("chat-app-user", JSON.stringify("user"));
    navigate("/");
  };

  useEffect(() => {
    async function redirectToLogin() {
      if (!localStorage.getItem("chat-app-user")) navigate("/login");
    }
    redirectToLogin();
  }, []);

  useEffect(() => {
    async function getRandomAvatar() {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    }
    getRandomAvatar();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center flex-col gap-12 bg-slate-900 h-screen w-screen">
          <img src={loader} alt="loader" />
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col gap-12 bg-slate-900 h-screen w-screen">
          <div>
            <h1 className="text-white text-3xl font-bold">
              Pick an avatar as your profile picture
            </h1>
          </div>
          <div className="flex gap-8">
            {avatars.map((avatar, index) => (
              <div
                key={avatar}
                className="p-2 rounded-full felx justify-center items-center transition-all border-8"
                style={{
                  borderColor:
                    selectedAvatar === index ? "#4e0eff" : "transparent",
                }}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  className="h-24"
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            ))}
          </div>
          <button
            className="bg-purple-500 text-white px-8 py-4 border-none font-bold cursor-pointer text-base uppercase transition-all rounded-xl hover:bg-purple-400"
            onClick={setProfilePicture}
          >
            Set as Profile Picture
          </button>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
