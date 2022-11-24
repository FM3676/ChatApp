import { ToastOptions, toast } from "react-toastify";

export const toastOptions: ToastOptions = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export const toastErrorLog = (value: string) =>
  toast.error(value, toastOptions);
