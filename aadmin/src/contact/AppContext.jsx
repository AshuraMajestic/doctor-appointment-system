import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const value = {
    // Your shared data/functions here
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
