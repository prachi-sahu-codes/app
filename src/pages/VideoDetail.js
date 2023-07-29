import React from "react";
import { useParams } from "react-router";
import { MdOutlineWatchLater, MdPlaylistAdd } from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useData } from "../context/DataContext";
import { SuggestionVideos } from "../components/SuggestionVideos";

export const VideoDetail = () => {
  const { videoId } = useParams();
  const { state } = useData();

  const findVideo = state?.videoData?.find(
    (item) => item._id === Number(videoId)
  );

  return (
    <div className="py-3 px-6 flex overflow-x-hidden">
      <div className="">
        <iframe
          width="760"
          height="415"
          src={findVideo?.src}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
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
            <MdOutlineWatchLater className="text-lg cursor-pointer hover:text-primary" />
            <MdPlaylistAdd className="text-xl cursor-pointer hover:text-primary" />
            <HiOutlinePencilAlt className="text-md cursor-pointer hover:text-primary" />
          </div>
        </div>
        <hr />
        <div>
          <h1 className="font-bold text-xl my-5">My Notes</h1>
        </div>
      </div>
      <SuggestionVideos />
    </div>
  );
};
