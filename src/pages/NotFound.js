import React from "react";
import { useNavigate } from "react-router";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="centerBox centerContent">
      <h1 className="font-bold text-2xl my-4">Page not found</h1>
      <p>Go back to Home</p>
      <button
        onClick={() => navigate("/")}
        className="bg-primary text-white py-1 px-4 text-lg rounded-md m-4"
      >
        Home
      </button>
    </div>
  );
};
