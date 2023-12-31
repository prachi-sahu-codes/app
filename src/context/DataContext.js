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
        const newData = state?.videoData?.map((item) => {
          if (item._id === action.payload.videoData._id) {
            if (item.notes) {
              return {
                ...item,
                notes: [...item.notes, action.payload.noteData],
              };
            } else {
              return { ...item, notes: [action.payload.noteData] };
            }
          } else {
            return item;
          }
        });

        localStorage.setItem("wholeData", JSON.stringify(newData));

        return { ...state, videoData: newData };

      case "EDIT_NOTES":
        const editData = state?.videoData
          .find((item) => item._id === action.payload.findVideo._id)
          .notes.find((item) => item?._id === action.payload?.noteId);
        console.log(editData);
        return { ...state, notesData: editData };

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
        localStorage.setItem("wholeData", JSON.stringify(deleteData));
        return { ...state, videoData: deleteData };

      case "EDIT_PREVIOUS_NOTE":
        const editPreviousData = state?.videoData.map((item) =>
          item._id === action.payload.videoData._id
            ? {
                ...item,
                notes: item.notes.map((note) =>
                  note._id === action.payload?.noteData?._id
                    ? { ...note, content: action.payload?.noteData?.content }
                    : note
                ),
              }
            : item
        );
        localStorage.setItem("wholeData", JSON.stringify(editPreviousData));
        return { ...state, notesData: {}, videoData: editPreviousData };

      default:
        return state;
    }
  };

  const localStgWatchLater = JSON.parse(localStorage.getItem("watchLater"));
  const localStgPlayList = JSON.parse(localStorage.getItem("playList"));
  const localStgData = JSON.parse(localStorage.getItem("wholeData"));

  const [state, dispatch] = useReducer(reducerFunction, {
    categoryData: [...categories],
    videoData: localStgData ?? [...videos],
    searchData: [...videos],
    watchLaterData: localStgWatchLater ?? [],
    playlistData: localStgPlayList ?? [],
    notesData: {},
  });

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
