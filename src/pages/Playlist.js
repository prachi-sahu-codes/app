import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { NewPlaylistModal } from "../components/NewPlaylistModal";

export const Playlist = () => {
  const { state, dispatch } = useData();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="py-2 px-6">
      <h1 className="font-bold text-2xl my-4">Playlist</h1>
      {state?.playlistData.length > 0 ? (
        <div className="flex gap-5 items-center">
          <ul className="flex flex-wrap gap-10">
            {state?.playlistData.map(
              ({ _id, thumbnail, title, description }) => (
                <li
                  key={_id}
                  className="relative w-60 cursor-pointer hover:opacity-80 hover:scale-105"
                  onClick={() => navigate(`/playlist/${_id}`)}
                >
                  <img
                    src={thumbnail}
                    alt=""
                    className="w-64 h-36 object-cover rounded-md"
                  />
                  <h1 className="font-bold pt-2">{title}</h1>
                  <p className=" text-sm text-gray-600">{description}</p>
                  <RxCross2
                    className="absolute top-0 right-0 p-1 text-primary bg-white rounded-bl-lg text-2xl cursor-pointer"
                    onClick={(e) => {
                      dispatch({ type: "DELETE_PLAYLIST", payload: _id });
                      e.stopPropagation();
                    }}
                  />
                </li>
              )
            )}
          </ul>
          <MdOutlineAddCircleOutline
            className="cursor-pointer text-3xl mb-6 hover:text-primary mx-8"
            onClick={() => setShowModal((prev) => !prev)}
          />
        </div>
      ) : (
        <div className="centerBox centerContent text-2xl text-center">
          <MdOutlineAddCircleOutline
            className="cursor-pointer text-3xl mb-6 hover:text-primary"
            onClick={() => setShowModal((prev) => !prev)}
          />
          <p>
            There are currently no playlists available. Start creating your
            playlists now!
          </p>
        </div>
      )}

      {showModal && <NewPlaylistModal setShowModal={setShowModal} />}
    </div>
  );
};
