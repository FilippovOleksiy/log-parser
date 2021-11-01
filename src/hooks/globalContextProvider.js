import React, { createContext, useContext, useState, useMemo } from "react";

const ReactGlobalContext = createContext(null);

function GlobalContextProvider({ children }) {
  const [context, setContext] = useState({});
  const value = useMemo(() => ({ context, setContext }), [context, setContext]);

  return (
    <ReactGlobalContext.Provider value={value}>
      {children}
    </ReactGlobalContext.Provider>
  );
}

const useGlobalContext = () => {
  const context = useContext(ReactGlobalContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalContext must be used within a ReactGlobalContext"
    );
  }
  return context;
};

export { GlobalContextProvider, useGlobalContext };
