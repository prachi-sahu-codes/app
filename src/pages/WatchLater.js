import React from "react";
import { useData } from "../context/DataContext";
import { useNavigate } from "react-router";
import { Card } from "../components/Card";

export const WatchLater = () => {
  const { state } = useData();
  const navigate = useNavigate();

  return (
    <div className="py-2 px-6">
      <h1 className="font-bold text-2xl my-4">Watch Later</h1>
      {state?.watchLaterData?.length > 0 ? (
        <ul className="flex flex-wrap gap-10">
          {state?.watchLaterData?.map((item) => (
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
        <p className="centerBox centerContent text-2xl text-center">
          No videos have been added to watch later. Start adding some now!
        </p>
      )}
    </div>
  );
};
