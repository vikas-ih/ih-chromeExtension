import React, { useState, useEffect } from "react";
// import Image from "next/image";
import { useAuth } from "@frontegg/react";
import { useNavigate } from "react-router-dom";
import { NewInsightIcon } from "./NewInsight.icon";
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
    <div className="flex flex-col justify-center items-center h-screen text-center p-5">
      <NewInsightIcon className={"mr-2 mb-8"} />

      <h1 className="text-3xl text-black font-bold mb-4">
        You are authenticated, you can close this tab and open the extension
      </h1>

      <button
        onClick={handleLogout}
        className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-200 transition"
      >
        Sign out
      </button>
    </div>
  );
};

export default SignInTab;
