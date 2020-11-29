import React, { useState, useMemo } from 'react';

const Context = React.createContext();

export function Provider({ children }) {
  const [authState, setAuthState] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const dispatch = useMemo(
    () => ({
      setAuthState: (payload) => setAuthState(payload),
      setIsSignedIn: (payload) => setIsSignedIn(payload),
    }),
    [],
  );

  return (
    <Context.Provider value={{ dispatch, authState, isSignedIn }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
