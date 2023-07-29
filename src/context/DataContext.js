import { createContext, useContext, useReducer } from "react";
import { categories, videos } from "../backend/data";
import { toast } from "react-toastify";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const reducerFunction = (state, action) => {
    switch (action.type) {
      case "SEARCH":
        const filterVideos = state?.videoData.filter((item) =>
          item.title.toLowerCase().includes(action.payload.toLowerCase())
        );
        return { ...state, searchData: filterVideos };

      case "ADD_WATCHLATER":
        const findVideo = state?.videoData.find(
          (item) => item._id === action.payload
        );

        localStorage.setItem(
          "watchLater",
          JSON.stringify([...state?.watchLaterData, findVideo])
        );

        return {
          ...state,
          watchLaterData: [...state?.watchLaterData, findVideo],
        };

      case "REMOVE_WATCHLATER":
        const removeVideo = state?.watchLaterData.filter(
          (item) => item._id !== action.payload
        );

        localStorage.setItem("watchLater", JSON.stringify(removeVideo));

        return {
          ...state,
          watchLaterData: removeVideo,
        };

      case "CREATE_PLAYLIST":
        const newPlaylist = {
          _id: action.payload._id,
          title: action.payload.title,
          description: action.payload.desc,
          thumbnail: "https://picsum.photos/200/174",
          videos: [],
        };
        localStorage.setItem(
          "playList",
          JSON.stringify([...state.playlistData, newPlaylist])
        );
        return { ...state, playlistData: [...state.playlistData, newPlaylist] };

      case "DELETE_PLAYLIST":
        const updatedPlaylist = state.playlistData.filter(
          (item) => item._id !== action.payload
        );
        localStorage.setItem("playList", JSON.stringify(updatedPlaylist));
        return { ...state, playlistData: updatedPlaylist };

      case "VIDEO_ADD_PLAYLIST":
        const checkPresence = state?.playlistData
          .find((item) => item._id === action.payload.playlistId)
          ?.videos.filter((item) => item._id === action.payload.videoData?._id);

        if (checkPresence.length === 0) {
          const addVideoInPlaylist = state?.playlistData.map((item) =>
            item._id === action.payload.playlistId
              ? { ...item, videos: [...item.videos, action.payload.videoData] }
              : item
          );
          localStorage.setItem("playList", JSON.stringify(addVideoInPlaylist));
          toast.success("Video added in the playlist!");
          return { ...state, playlistData: addVideoInPlaylist };
        } else {
          toast.error("Video already present in this playlist!");
          return state;
        }

      case "VIDEO_DELETE_PLAYLIST":
        return { ...state };

      default:
        return state;
    }
  };

  const localStgWatchLater = JSON.parse(localStorage.getItem("watchLater"));
  const localStgPlayList = JSON.parse(localStorage.getItem("playList"));

  const [state, dispatch] = useReducer(reducerFunction, {
    categoryData: [...categories],
    videoData: [...videos],
    searchData: [...videos],
    watchLaterData: localStgWatchLater ?? [],
    playlistData: localStgPlayList ?? [],
  });

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
