import React, { createContext, useContext } from 'react';
import { Role } from '../types';

interface UserContextType {
  currentUserRole: Role;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserContext.Provider');
  }
  return context;
};
