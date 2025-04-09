import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";

export type Theme = {
  name: string;  
  background: string;
  text: string;
  primary: string;
  cardBackground: string;
  buttonBackground: string;
  border: string;
};


export const lightTheme: Theme = {
  name: "light",
  background: "#ffffff",
  text: "#000000",
  primary: "#007bff",
  cardBackground: "#ffffff",
  buttonBackground: "#ff4d4d",
  border: "#ffffff"

};

export const darkTheme: Theme = {
  name: "dark",
  background: "#121212",
  text: "#000000",
  primary: "black",
  cardBackground: "#121212",
  buttonBackground: "#ff4d4d",
  border: "#ffffff",


};

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(systemScheme === "dark" ? darkTheme : lightTheme);

  useEffect(() => {
    setTheme(systemScheme === "dark" ? darkTheme : lightTheme);
  }, [systemScheme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe ser usado dentro de un ThemeProvider");
  }
  return context;
  
};
