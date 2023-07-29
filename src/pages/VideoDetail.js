import React, { useState } from "react";
import { useParams } from "react-router";
import {
  MdWatchLater,
  MdOutlineWatchLater,
  MdPlaylistAdd,
} from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useData } from "../context/DataContext";
import { SuggestionVideos } from "../components/SuggestionVideos";
import { AddPlaylistModal } from "../components/AddPlaylistModal";
import { NotesCard } from "../components/NotesCard";
import { AddNotesModal } from "../components/AddNotesModal";

export const VideoDetail = () => {
  const { videoId } = useParams();
  const { state, dispatch } = useData();
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);

  const findVideo = state?.videoData?.find(
    (item) => item._id === Number(videoId)
  );

  const checkWatchLater = state?.watchLaterData?.filter(
    (video) => video._id === findVideo._id
  );

  return (
    <div className="py-3 px-6 flex overflow-x-hidden">
      <div className="w-full h-screen overflow-y-scroll hideScrollBar px-2">
        <iframe
          width="760"
          height="415"
          src={findVideo?.src}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        <div className="flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <img
              src="https://picsum.photos/50/50"
              alt="channel icon"
              className="rounded-full w-8 h-8 my-2 object-cover"
            />
            <h1 className="font-bold pt-2 text-sm">{findVideo?.title}</h1>
          </div>
          <div className="flex gap-3 items-center">
            {checkWatchLater?.length > 0 ? (
              <MdWatchLater
                className="text-lg cursor-pointer hover:text-primary"
                onClick={() => {
                  dispatch({
                    type: "REMOVE_WATCHLATER",
                    payload: findVideo._id,
                  });
                }}
              />
            ) : (
              <MdOutlineWatchLater
                className="text-lg cursor-pointer hover:text-primary"
                onClick={() => {
                  dispatch({ type: "ADD_WATCHLATER", payload: findVideo._id });
                }}
              />
            )}
            <div className="relative">
              <MdPlaylistAdd
                className="text-xl cursor-pointer hover:text-primary"
                onClick={() => setShowPlaylistModal((prev) => !prev)}
              />
              {showPlaylistModal && (
                <AddPlaylistModal
                  setShowPlaylistModal={setShowPlaylistModal}
                  findVideo={findVideo}
                />
              )}
            </div>
            <div className="relative">
              <HiOutlinePencilAlt
                className="text-md cursor-pointer hover:text-primary"
                onClick={() => setShowNotesModal((prev) => !prev)}
              />
              {showNotesModal && (
                <AddNotesModal
                  setShowNotesModal={setShowNotesModal}
                  findVideo={findVideo}
                />
              )}
            </div>
          </div>
        </div>
        <hr />
        <NotesCard findVideo={findVideo} />
      </div>
      <SuggestionVideos />
    </div>
  );
};
