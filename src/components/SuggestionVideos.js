import React from "react";
import { useNavigate } from "react-router";
import { useData } from "../context/DataContext";

export const SuggestionVideos = () => {
  const { state } = useData();
  const navigate = useNavigate();

  return (
    <div className="w-96 mx-3">
      <h1 className="font-bold text-lg mt-2">More Videos: </h1>
      <ul className="">
        {state?.videoData.map(({ _id, thumbnail, title, creator }) => (
          <li
            key={_id}
            className="cursor-pointer flex gap-3 my-4"
            onClick={() => navigate(`/video/${_id}`)}
          >
            <img src={thumbnail} alt="" className="w-44 h-24 object-cover" />
            <div>
              <p className="text-xs font-bold text-primary">{title}</p>
              <p className="text-xs py-2 text-primary">{creator}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
