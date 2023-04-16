import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export function AppContextProvider({ children }) {
  const [addModelStatus, setAddModelStatus] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const contextValue = {
    setAddModelStatus,
    addModelStatus,
    searchQuery,
    setSearchQuery,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
