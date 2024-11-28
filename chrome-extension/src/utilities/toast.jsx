import { toast } from "react-toastify";
import { message as antdMessage } from "antd";
import { ToastSuccessIcon } from "../icons";
import { ToastInfoIcon } from "../icons/ToastSuccess.icon";

const isMobile = window.innerWidth < 1260;

export const showToastSuccess = (message) => {
  toast.dismiss();
  if (isMobile) {
    antdMessage.success(message);
  } else {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      progressStyle: { background: "#01d091" },
      className: "fixed top-0 w-80 mt-3 bg-white font-sans",
      icon: <ToastSuccessIcon />,
    });
  }
};

export const showToastInfo = (message) => {
  toast.dismiss();
  if (isMobile) {
    antdMessage.info(message);
  } else {
    toast.info(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      progressStyle: { background: "#5667E9" },
      className: "fixed top-0 w-80 mt-3 bg-white font-sans",
      icon: <ToastInfoIcon />,
    });
  }
};
