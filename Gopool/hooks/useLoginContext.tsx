import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definir tipos para el estado del contexto
interface MyContextType {
  state: boolean;
  toggleState: () => void;
}

// Crear el contexto con un valor predeterminado de tipo `MyContextType`
const login = createContext<MyContextType | undefined>(undefined);

// Crear un provider para envolver nuestra app
interface MyProviderProps {
  children: ReactNode;  // Permite pasar cualquier tipo de componente como hijo
}

export const MyContextLogin: React.FC<MyProviderProps> = ({ children }) => {
  const [state, setState] = useState<boolean>(false);  // Estado inicial como `false`

  // Función para cambiar el estado
  const toggleState = () => setState(prevState => !prevState);

  return (
    <login.Provider value={{ state, toggleState }}>
      {children}
    </login.Provider>
  );
};

// Hook para acceder al contexto
export const useLoginContext = (): MyContextType => {
  const context = useContext(login);
  if (!context) {
    throw new Error("useMyContext debe ser usado dentro de un MyProvider");
  }
  return context;
};
