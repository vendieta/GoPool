import React, { createContext, useContext, useState, ReactNode } from 'react';

// Tipos para el contexto
interface RoleContextType {
  isDriver: boolean;
  setIsDriver: (isDriver: boolean) => void;
  toggleRole: () => void;
}

// Crear el contexto (valor inicial undefined)
const RoleContext = createContext<RoleContextType | undefined>(undefined);

// Props del Provider
interface RoleProviderProps {
  children: ReactNode;
}

// Provider del contexto
export const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
  const [isDriver, setIsDriver] = useState<boolean>(false);

  // Función para cambiar entre driver y user
  const toggleRole = () => setIsDriver(prev => !prev);

  return (
    <RoleContext.Provider value={{ isDriver, setIsDriver, toggleRole }}>
      {children}
    </RoleContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useRoleContext = (): RoleContextType => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRoleContext debe usarse dentro de un RoleProvider');
  }
  return context;
};