import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { useData } from "../context/DataContext";
import { toast } from "react-toastify";

export const AddNotesModal = ({ setShowNotesModal, findVideo }) => {
  const { dispatch } = useData();
  const [inputData, setInputData] = useState("");

  const clickHandler = () => {
    if (inputData) {
      const playlistId = uuid();
      const includeId = { content: inputData, _id: playlistId };
      dispatch({
        type: "ADD_NOTES",
        payload: { noteData: includeId, videoData: findVideo },
      });
      setShowNotesModal(false);
    } else {
      toast.error("Please add some notes!");
    }
  };
  return (
    <div className="absolute top-7 right-0 w-64 bg-slate-50 px-3 pt-5 pb-3 rounded-lg shadow-lg">
      <h1 className="text-lg font-semibold mb-6 pb-2 border-b-2">
        Add New Note
      </h1>
      <input
        type="text"
        placeholder="New notes"
        className="block my-2 mb-3 w-full px-2 py-1 border-2 border-gray-100 rounded-md"
        onChange={(e) => setInputData(() => e.target.value)}
      />
      <button
        className="bg-primary hover:opacity-80 text-white -mb-1 pt-1 px-4 text-lg rounded-md m-4"
        onClick={() => clickHandler()}
      >
        Add New Notes
      </button>
    </div>
  );
};
