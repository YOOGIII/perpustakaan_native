// UserContext.js

import React, { createContext, useState, useContext } from 'react';

// Buat UserContext
const UserContext = createContext();

// Provider untuk UserContext
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Simpan informasi pengguna di state

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook untuk menggunakan UserContext
export const useUser = () => {
  return useContext(UserContext);
};
