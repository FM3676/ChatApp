import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
import { toastErrorLog } from "../utils/toastLog";
/* CONST */
const inputClasses =
  "bg-transparent p-4 border-2 rounded-md text-white w-full border-purple-900 focus:outline-none focus:border-purple-500";

/* INTERFACES */
interface loginData {
  username: string;
  password: string;
}

/* MAIN */
export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState<loginData>({} as loginData);

  /* Logined Redirect */
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) navigate("/");
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> | undefined = async (
    e
  ) => {
    e.preventDefault();
    if (!handleValidation()) return;
    const { password, username } = values;
    const { data } = await axios.post(loginRoute, {
      password,
      username,
    });

    if (data.status === false) return toastErrorLog(data.msg);
    if (data.status === true) {
      localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      navigate("/");
    }
  };

  const handleValidation = () => {
    const { password, username } = values;
    if (password === "" || username === "") {
      toastErrorLog("Password and Username is required.");
      return false;
    }
    return true;
  };
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    } as loginData);

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
            min="3"
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
          <button className="bg-purple-500 text-white px-8 py-4 border-none font-bold cursor-pointer text-base uppercase transition-all rounded-xl hover:bg-purple-400">
            Sign in
          </button>
          <span className="text-white uppercase">
            Don't have account ?{" "}
            <Link
              to="/register"
              className="font-bold no-underline text-purple-400"
            >
              Sign up
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
