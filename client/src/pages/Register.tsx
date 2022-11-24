import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import axios from "axios";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";
import { toastErrorLog } from "../utils/toastLog";
/* CONST */
const inputClasses =
  "bg-transparent p-4 border-2 rounded-md text-white w-full border-purple-900 focus:outline-none focus:border-purple-500";

/* INTERFACES */
interface registerData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/* MAIN */
export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({} as registerData);
  const handleSubmit: FormEventHandler<HTMLFormElement> | undefined = async (
    e
  ) => {
    e.preventDefault();
    if (!handleValidation()) return;
    const { password, confirmPassword, username, email } = values;
    const { data } = await axios.post(registerRoute, {
      password,
      username,
      email,
    });
    if (data.status === false) return toastErrorLog(data.msg);
    if (data.status === true) {
      localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      navigate("/");
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toastErrorLog("Password and Confirm Password should be same.");
      return false;
    } else if (username.length < 3) {
      toastErrorLog("Username should be greater than 3 characters.");
      return false;
    } else if (password.length < 8) {
      toastErrorLog("Password should be equal or greater than 8 characters");
      return false;
    } else if (email === "") {
      toastErrorLog("Email is required");
      return false;
    }
    return true;
  };
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    } as registerData);

  return (
    <>
      <div
        className="h-screen w-screen flex flex-col justify-center gap-4 items-center"
        style={{ backgroundColor: "#131324" }}
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 rounded-2xl px-20 py-12"
          style={{ backgroundColor: "#00000076" }}
        >
          <div className="flex items-center gap-4 justify-center">
            <img className="h-20" src={Logo} alt="Logo" />
            <h1 className="text-white uppercase font-bold text-3xl">snappy</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            className={inputClasses}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            className={inputClasses}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className={inputClasses}
            onChange={handleChange}
            autoComplete="on"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            className={inputClasses}
            onChange={handleChange}
            autoComplete="on"
          />
          <button className="bg-purple-500 text-white px-8 py-4 border-none font-bold cursor-pointer text-base uppercase transition-all rounded-xl hover:bg-purple-400">
            Sign Up
          </button>
          <span className="text-white uppercase">
            Already have account ?{" "}
            <Link
              to="/login"
              className="font-bold no-underline text-purple-400"
            >
              Sign in
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
