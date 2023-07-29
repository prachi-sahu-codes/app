import React from "react";
import { useData } from "../context/DataContext";

export const Playlist = () => {
  const { state } = useData();
  return (
    <div className="py-2 px-6">
      <h1 className="font-bold text-2xl my-4">Playlist</h1>
      {state.watchLaterData.length > 0 ? (
        <div>videosa</div>
      ) : (
        <p className="centerBox centerContent text-2xl text-center">
          There are currently no playlists available. Start creating your
          playlists now!
        </p>
      )}
    </div>
  );
};
