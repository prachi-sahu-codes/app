import React from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { useData } from "../context/DataContext";
import { Card } from "../components/Card";

export const PlaylistDetail = () => {
  const { state } = useData();
  const { playlistId } = useParams();
  const navigate = useNavigate();

  const findPlaylist = state?.playlistData.find(
    (item) => item?._id === playlistId
  );

  return (
    <div>
      <h1 className="font-bold text-2xl my-4">{findPlaylist?.title}</h1>
      {findPlaylist?.videos.length > 0 ? (
        <ul>
          {findPlaylist?.videos.map((item) => (
            <li
              key={item._id}
              className="w-60"
              onClick={() => navigate(`/video/${item._id}`)}
            >
              <Card item={item} noDetail />
            </li>
          ))}
        </ul>
      ) : (
        <p className="centerBox centerContent text-2xl text-center">
          No videos added yet!
        </p>
      )}
    </div>
  );
};
