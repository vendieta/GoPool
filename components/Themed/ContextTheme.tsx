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
  gradientStart: string;
  gradientEnd: string;
  accent: string;
  subtleBackground: string;
  labelText: string;
  avatarBorder: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
};

export const lightTheme: Theme = {
  name: "light",
  background: "#f5f5f5",           // Fondo general suave
  primary: "#1D3D47",              // Azul oscuro elegante (usado en header)
  buttonBackground: "#4A90E2",     // Botón azul vibrante
  border: "#e0e0e0",               // Gris claro para bordes
  avatarBorder: "#4A90E2",         // Borde azul
  success: "#4CAF50",              // Verde claro éxito
  warning: "#FFC107",              // Amarillo vivo
  danger: "#F44336",               // Rojo fuerte
  info: "#2196F3",                 // Azul informativo
  cardBackground: '#FFFFFF',
  text: '#212121',
  subtleBackground: '#F0F2F5',
  accent: '#0066FF',
  labelText: '#6E6E6E',
  gradientStart: '#DCEEFF',
  gradientEnd: '#F9FCFF',
};

export const darkTheme: Theme = {
  name: "dark",
  background: "#121212",           // Fondo oscuro
  primary: "#0d232a",              // Azul muy oscuro (header dark)
  buttonBackground: "#4A90E2",     // Mismo botón azul vibrante
  border: "#2c2c2c",               // Gris oscuro para bordes
  avatarBorder: "#4A90E2",         // Mismo azul
  success: "#66BB6A",              // Verde éxito claro
  warning: "#FFD54F",              // Amarillo pastel
  danger: "#E57373",               // Rojo suave
  info: "#64B5F6",                 // Azul suave informativo
  cardBackground: '#1C1C1E',
  text: '#f1f1f1',
  subtleBackground: '#2A2A2C',
  accent: '#4D9EFF',
  labelText: '#AAAAAA',
  gradientStart: '#2B2B2D',
  gradientEnd: '#1C1C1E',
};


type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(
    systemScheme === "dark" ? darkTheme : lightTheme
  );

  const toggleTheme = () => {
    setTheme(theme.name === "light" ? darkTheme : lightTheme);
  };

  useEffect(() => {
    setTheme(systemScheme === "dark" ? darkTheme : lightTheme);
  }, [systemScheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
