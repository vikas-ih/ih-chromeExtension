
import React, { useState, useEffect } from "react";
// import Image from "next/image";
import HourGlass from "./assets/hour_glass.gif";
import { useAuth } from "@frontegg/react";
import { useNavigate } from "react-router-dom";
const SignInTab = () => {
  const [countdown, setCountdown] = useState(10);
  const params = new URLSearchParams(window.location.search);

  // Check if the `autoClose` parameter is present
  if (params.get("autoClose") === "true") {
    console.log("Tab will auto-close in 5 seconds");

    // Set a timer to close the tab
    setTimeout(() => {
      window.close();
    }, 10000); // Close after10 seconds
  }
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    // if you are using hosted login box change the value to 'oauth/account/logout'
    navigate("/account/logout");
    alert("Logged out successfully!");
    // window.close();
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);

    if (countdown === 0) {
      window.close();
    }

    return () => clearInterval(interval);
  }, [countdown]);


  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black text-white text-center p-5">
      <img
        src={HourGlass}
        alt="loader"
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "60px",
          width: "25%",
        }}
      />
      <h1 className="text-3xl font-bold mb-4">
        You are authenticated, you can close this tab and open the extension
      </h1>
      {/* <p className="text-lg mb-8">
        This tab will close automatically in{" "}
        <span className="font-semibold">{countdown}</span> seconds.
      </p> */}
      <button
        onClick={handleLogout}
        className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-200 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default SignInTab;
