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
        toast.success("Video added to watch later!");
        return {
          ...state,
          watchLaterData: [...state?.watchLaterData, findVideo],
        };

      case "REMOVE_WATCHLATER":
        const removeVideo = state?.watchLaterData.filter(
          (item) => item._id !== action.payload
        );

        localStorage.setItem("watchLater", JSON.stringify(removeVideo));
        toast.error("Video removed from watch later!");
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
        toast.success("New playlist created!");
        return { ...state, playlistData: [...state.playlistData, newPlaylist] };

      case "DELETE_PLAYLIST":
        const updatedPlaylist = state.playlistData.filter(
          (item) => item._id !== action.payload
        );
        localStorage.setItem("playList", JSON.stringify(updatedPlaylist));
        toast.error("Playlist deleted!");
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
        const deleteVideoFromPlaylist = state?.playlistData.map((item) =>
          item._id === action.payload.playlistId
            ? {
                ...item,
                videos: item?.videos?.filter(
                  (item) => item._id !== action.payload.videoId
                ),
              }
            : item
        );

        console.log(deleteVideoFromPlaylist);
        localStorage.setItem(
          "playList",
          JSON.stringify(deleteVideoFromPlaylist)
        );
        toast.error("Video deleted from the playlist!");
        return { ...state, playlistData: deleteVideoFromPlaylist };

      case "ADD_NOTES":
        const newData = state?.videoData.map((item) =>
          item._id === action.payload.videoData._id
            ? { ...item, notes: [action.payload.noteData] }
            : item
        );

        return { ...state, videoData: newData };

      case "EDIT_NOTES":
        const editData = state?.videoData.map((item) =>
          item._id === action.payload.findVideo._id
            ? {
                ...item,
                notes: item.notes.map((note) =>
                  note._id === action.payload?.noteId
                    ? action.payload?.noteId
                    : item
                ),
              }
            : item
        );
        return { ...state, videoData: editData };

      case "DELETE_NOTES":
        const deleteData = state?.videoData.map((item) =>
          item._id === action.payload.findVideo._id
            ? {
                ...item,
                notes: item.notes.filter(
                  (note) => note._id !== action.payload?.noteId
                ),
              }
            : item
        );
        return { ...state, videoData: deleteData };

      default:
        return state;
    }
  };

  const localStgWatchLater = JSON.parse(localStorage.getItem("watchLater"));
  const localStgPlayList = JSON.parse(localStorage.getItem("playList"));
  const localStgNotes = JSON.parse(localStorage.getItem("notes"));

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
