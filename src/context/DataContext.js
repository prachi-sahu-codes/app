import { createContext, useContext, useReducer } from "react";
import { categories, videos } from "../backend/data";

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

        return {
          ...state,
          watchLaterData: [...state?.watchLaterData, findVideo],
        };

      case "REMOVE_WATCHLATER":
        const removeVideo = state?.watchLaterData.filter(
          (item) => item._id !== action.payload
        );

        return {
          ...state,
          watchLaterData: removeVideo,
        };

      default:
        return state;
    }
  };

  const localStgWatchLater = JSON.parse(localStorage.getItem("watchLater"));
  // console.log(localStgWatchLater);

  const [state, dispatch] = useReducer(reducerFunction, {
    categoryData: [...categories],
    videoData: [...videos],
    searchData: [...videos],
    watchLaterData: localStgWatchLater ?? [],
  });
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
