import React from "react";
import { useData } from "../context/DataContext";
import { AiFillDelete } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";

export const NotesCard = ({ findVideo }) => {
  const { state, dispatch } = useData();
  const getVideoData = state.videoData.find(
    (item) => item?._id === findVideo?._id
  );

  return (
    <div>
      <h1 className="font-bold text-xl my-5">My Notes</h1>
      <ul>
        {getVideoData?.notes?.map((item) => (
          <li key={item?._id} className="flex justify-between items-center">
            <p>{item?.content}</p>
            <div className="flex gap-3">
              <BsFillPencilFill
                className="text-sm hover:text-primary"
                onClick={() =>
                  dispatch({
                    type: "EDIT_NOTES",
                    payload: { noteId: item?._id, findVideo: getVideoData },
                  })
                }
              />
              <AiFillDelete
                className=" hover:text-primary"
                onClick={() =>
                  dispatch({
                    type: "DELETE_NOTES",
                    payload: { noteId: item?._id, findVideo: getVideoData },
                  })
                }
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
