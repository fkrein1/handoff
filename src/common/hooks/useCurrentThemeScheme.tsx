import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useColorScheme } from "react-native";

import { ThemeScheme } from "../theme/types";

const STORAGE_KEY = "@handoff:theme-scheme";
const DEFAULT_THEME_SCHEME: ThemeScheme = "light";

interface ThemeContextValue {
  theme: ThemeScheme;
  setTheme: (value: ThemeScheme) => void;
  isReady: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const systemTheme = useColorScheme() ?? DEFAULT_THEME_SCHEME;
  const [storedTheme, setStoredTheme] = useState<ThemeScheme | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initializeTheme();
  }, []);

  const initializeTheme = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark") {
        setStoredTheme(stored);
      }
    } catch (error) {
      console.error("Failed to load theme:", error);
    } finally {
      setIsReady(true);
    }
  };

  const handleSetTheme = async (newTheme: ThemeScheme) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, newTheme);
      setStoredTheme(newTheme);
    } catch (error) {
      console.error("Failed to save theme:", error);
    }
  };

  const currentTheme = storedTheme ?? systemTheme;

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        setTheme: handleSetTheme,
        isReady,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export function useThemeScheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeScheme must be used within a ThemeProvider");
  }
  return context;
}
