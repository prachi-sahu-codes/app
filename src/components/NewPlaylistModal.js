import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useData } from "../context/DataContext";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";

export const NewPlaylistModal = ({ setShowModal }) => {
  const [inputData, setInputData] = useState({ title: "", desc: "" });
  const { dispatch } = useData();

  const clickHandler = () => {
    if (inputData.title && inputData.desc) {
      const includeId = { ...inputData, _id: uuid() };
      dispatch({ type: "CREATE_PLAYLIST", payload: includeId });
      setShowModal(false);
    } else {
      toast.error("Please fill all details!");
    }
  };

  return (
    <div className="modal-bg">
      <div className="modal felx flex-col">
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
        <RxCross2
          className="modal-cancel text-xl m-2 cursor-pointer"
          onClick={() => setShowModal(false)}
        />
      </div>
    </div>
  );
};
