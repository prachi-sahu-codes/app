import { createContext, useContext, useReducer } from "react";
import { categories, videos } from "../backend/data";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const reducerFunction = (state, action) => {
    switch (action.type) {
      case "SEARCH":
        const filterVideos = state.videoData.filter((item) =>
          item.title.toLowerCase().includes(action.payload.toLowerCase())
        );
        return { ...state, searchData: filterVideos };

      case "CATEGORY":
        return state;

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducerFunction, {
    categoryData: [...categories],
    videoData: [...videos],
    searchData: [...videos],
  });
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
