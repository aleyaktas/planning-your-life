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
      toast.dark(msg, {
        position: position,
        autoClose: timer,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    default:
      return;
  }
};

export default showNotice;
