"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "preferred-theme";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }
  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const root = window.document.documentElement;
  root.dataset.theme = theme;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = getPreferredTheme();
    setTheme(initial);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, theme);
    applyTheme(theme);
  }, [theme, mounted]);

  useEffect(() => {
    const handler = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? "dark" : "light");
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
      },
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
