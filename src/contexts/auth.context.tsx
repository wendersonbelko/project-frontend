import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
  authData: {
    isLoggedIn: false,
    user: null,
    token: null,
  },
  setAuthData: (data: any) => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authData, setAuthDataState] = useState({
    isLoggedIn: false,
    user: null,
    token: null,
  });

  const setAuthData = (data: any) => {
    setAuthDataState(data);
    sessionStorage.setItem('authData', JSON.stringify(data));
  };

  useEffect(() => {
    // Carregar dados do sessionStorage
    const storedAuthData = sessionStorage.getItem('authData');
    if (storedAuthData) {
      setAuthDataState(JSON.parse(storedAuthData));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
