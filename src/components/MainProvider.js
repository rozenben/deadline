// components/UserContext.js
import React, { createContext, useState } from 'react';


export const UserContext = createContext({user: null});

export const MainProvider = ({ children, user, updateUser }) => {
  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
