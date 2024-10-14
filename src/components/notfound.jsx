import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

function NotFound() {
  const [timer, setTimer] = useState(5);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(interval);
    } else {
      setRedirect(true);
    }
  }, [timer]);

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center bg-[#111827] text-[#60A5FA] text-9xl box-border">
      404
      <div className="text-white text-xl">Redirecting in {timer} seconds</div>
    </div>
  );
}

export default NotFound;
