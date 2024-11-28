import { toast } from "react-toastify";
import { message as antdMessage } from "antd";

const isMobile = window.innerWidth < 1260;

export const showToastError = (message) => {
  toast.dismiss();
  if (isMobile) {
    antdMessage.error(message);
  } else {
    toast.error(message, {
      autoClose: 5000,
      className: "fixed top-0 w-80 mt-3 bg-white font-sans",
    });
  }
};
