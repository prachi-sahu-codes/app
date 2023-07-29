import React from "react";
import { useNavigate } from "react-router";
import { useData } from "../context/DataContext";

export const Home = () => {
  const { state } = useData();
  const navigate = useNavigate();

  return (
    <div className="py-2 px-6">
      <h1 className="font-bold text-2xl my-4">Categories</h1>
      <ul className="flex flex-wrap gap-10">
        {state?.categoryData.map(({ _id, thumbnail, src, category }) => (
          <li
            key={_id}
            className="w-60 cursor-pointer hover:opacity-80 hover:scale-105"
            onClick={() => navigate(`/category/${category}`)}
          >
            <img
              src={thumbnail}
              alt=""
              className="w-64 h-36 object-cover rounded-md"
            />
            <p className="font-bold py-2">{category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
