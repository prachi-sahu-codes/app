import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { RxCross2 } from "react-icons/rx";
import { useData } from "../context/DataContext";
import { toast } from "react-toastify";

export const AddPlaylistModal = ({ setShowPlaylistModal, findVideo }) => {
  const [inputData, setInputData] = useState({ title: "", desc: "" });
  const { state, dispatch } = useData();

  const clickHandler = () => {
    if (inputData.title && inputData.desc) {
      const playlistId = uuid();
      const includeId = { ...inputData, _id: playlistId };
      dispatch({ type: "CREATE_PLAYLIST", payload: includeId });
      setShowPlaylistModal(false);
      dispatch({
        type: "VIDEO_ADD_PLAYLIST",
        payload: { playlistId: playlistId, videoData: findVideo },
      });
    } else {
      toast.error("Please fill all details!");
    }
  };

  return (
    <div className="absolute top-7 right-0 w-64 bg-slate-50 px-3 pt-5 pb-3 rounded-lg shadow-lg">
      <h1 className="text-lg font-semibold mb-6 pb-2 border-b-2">
        Add To Playlist
      </h1>
      <input
        type="text"
        placeholder="Enter title"
        className="block my-2 mb-3 w-full px-2 py-1 border-2 border-gray-100 rounded-md"
        onChange={(e) =>
          setInputData((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <input
        type="text"
        placeholder="Write a description"
        className="block my-2 w-full px-2 py-1 border-2 border-gray-100 rounded-md"
        onChange={(e) =>
          setInputData((prev) => ({ ...prev, desc: e.target.value }))
        }
      />
      <button
        className="bg-primary hover:opacity-80 text-white -mb-1 pt-1 px-4 text-lg rounded-md m-4"
        onClick={() => clickHandler()}
      >
        Create New Playlist
      </button>
      {state.playlistData.length > 0 && (
        <div>
          <hr className="mt-6 h-5 text-gray-600" />
          <ul>
            {state.playlistData.map((item) => (
              <li
                key={item._id}
                className="px-2 pb-2 flex items-center justify-between"
              >
                <p
                  className="cursor-pointer w-40 truncate"
                  onClick={() => {
                    dispatch({
                      type: "VIDEO_ADD_PLAYLIST",
                      payload: { playlistId: item._id, videoData: findVideo },
                    });
                    setShowPlaylistModal(false);
                  }}
                >
                  {item.title}
                </p>
                <RxCross2
                  className="text-lg m-2 cursor-pointer"
                  onClick={() =>
                    dispatch({ type: "DELETE_PLAYLIST", payload: item._id })
                  }
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
