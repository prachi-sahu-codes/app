import React from "react";
import { useNavigate } from "react-router";
import { useData } from "../context/DataContext";
import { Card } from "../components/Card";

export const Explore = () => {
  const { state, dispatch } = useData();
  const navigate = useNavigate();

  return (
    <div className="py-2 px-6">
      <h1 className="font-bold text-2xl my-4">Explore</h1>
      <input
        type="text"
        placeholder="Search video by title"
        className="w-full shadow-md rounded-full p-2 bg-gray-50 text-center mb-8"
        onChange={(e) => dispatch({ type: "SEARCH", payload: e.target.value })}
      />
      {state?.searchData?.length > 0 ? (
        <ul className="flex flex-wrap gap-10">
          {state?.searchData?.map((item) => (
            <li
              key={item._id}
              className="w-60"
              onClick={() => navigate(`/video/${item._id}`)}
            >
              <Card item={item} />
            </li>
          ))}
        </ul>
      ) : (
        <h1 className="centerContent text-lg">No videos found!</h1>
      )}
    </div>
  );
};
