import { createContext, useContext, useReducer } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const reducerFunction = (state, action) => {
    switch (action.type) {
      case "CATEGORY":
        return state;
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducerFunction, { categories: "" });
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
