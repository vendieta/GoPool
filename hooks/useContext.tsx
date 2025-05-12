// hooks/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useStorageContext = () => {
  const context = useContext(useStorageContext);
  if (!context) throw new Error('useStorageContext debe usarse dentro de StorageProvider');
  return context;
};



export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};
