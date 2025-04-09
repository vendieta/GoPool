import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";

export type Theme = {
  name: string;
  background: string;
  text: string;
  primary: string;
  cardBackground: string;
  buttonBackground: string;
};

export const lightTheme: Theme = {
  name: "light",
  background: "#ffffff",
  text: "#000000",
  primary: "#007bff",
  cardBackground: "#ffffff",
  buttonBackground: "#ff4d4d",
};

export const darkTheme: Theme = {
  name: "dark",
  background: "#121212",
  text: "#ffffff",
  primary: "#bb86fc",
  cardBackground: "#121212",
  buttonBackground: "#ff4d4d",
};

// Definimos el tipo de contexto para asegurarnos de que siempre tiene un tema y una función para cambiarlo
type ThemeContextType = {
  theme: Theme;  // Estado actual del tema
  toggleTheme: () => void;  // Función para cambiar entre temas manualmente
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(systemScheme === "dark" ? darkTheme : lightTheme);

  useEffect(() => {
    setTheme(prevTheme => (systemScheme === "dark" ? darkTheme : lightTheme));
  }, [systemScheme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme.name === "light" ? darkTheme : lightTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe ser usado dentro de un ThemeProvider");
  }
  return context;
};
