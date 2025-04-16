// ThemeContext.tsx
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

const STORAGE_KEY = "theme_scheme";
const DEFAULT_THEME_SCHEME: ThemeScheme = "light";

interface ThemeContextValue {
  value: ThemeScheme;
  setValue: (value: ThemeScheme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const systemThemeScheme = useColorScheme() ?? DEFAULT_THEME_SCHEME;
  const [themeScheme, setThemeScheme] = useState<ThemeScheme | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (stored === "light" || stored === "dark") {
        setThemeScheme(stored as ThemeScheme);
      } else {
        setThemeScheme(null);
      }
    });
  }, []);

  const handleSetThemeScheme = (value: ThemeScheme) => {
    setThemeScheme(value);
    AsyncStorage.setItem(STORAGE_KEY, value);
  };

  const value = themeScheme ?? systemThemeScheme;

  return (
    <ThemeContext.Provider value={{ value, setValue: handleSetThemeScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useThemeScheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useThemeScheme must be used within a ThemeProvider");
  }
  return ctx;
}
