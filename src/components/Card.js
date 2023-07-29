import React from "react";
import { useNavigate } from "react-router";
import { MdOutlineWatchLater, MdWatchLater } from "react-icons/md";
import { useData } from "../context/DataContext";

export const Card = ({ item }) => {
  const { state, dispatch } = useData();
  const navigate = useNavigate();

  const checkWatchLater = state?.watchLaterData?.filter(
    (video) => video._id === item._id
  );

  return (
    <div
      className="relative cursor-pointer"
      onClick={() => navigate(`/video/${item._id}`)}
    >
      <img src={item?.thumbnail} alt="" className="w-64 h-36 object-cover" />
      <div className="absolute top-0 right-0 p-1 bg-white rounded-bl-lg">
        {checkWatchLater.length > 0 ? (
          <MdWatchLater
            className="text-lg text-primary"
            onClick={(e) => {
              dispatch({ type: "REMOVE_WATCHLATER", payload: item._id });
              e.stopPropagation();
            }}
          />
        ) : (
          <MdOutlineWatchLater
            className="text-lg text-primary"
            onClick={(e) => {
              dispatch({ type: "ADD_WATCHLATER", payload: item._id });
              e.stopPropagation();
            }}
          />
        )}
      </div>
      <div className="flex gap-2 ">
        <img
          src="https://picsum.photos/50/50"
          alt="channel icon"
          className="rounded-full w-8 h-8 my-2 object-cover"
        />
        <div>
          <h1 className="font-bold pt-2 text-sm">{item?.title}</h1>
          <p className="font-bold text-sm">{item?.category}</p>
          <p className="text-xs text-gray-700">
            {item?.views} views | {item?.creator}
          </p>
        </div>
      </div>
    </div>
  );
};
