import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showNotice = (msg, type, timer = 3000, position = "top-center") => {
  switch (type) {
    case "warn":
      return toast.warn(msg, {
        position,
        autoClose: timer,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    case "error":
      return toast.error(msg, {
        position,
        autoClose: timer,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    case "dark":
      return toast.dark(msg, {
        position: position,
        autoClose: timer,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    case "success": 
      return toast.success(msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    default:
      return;
  }
};

export default showNotice;
