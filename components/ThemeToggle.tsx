"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="toggle"
      aria-label="Toggle dark mode"
    >
      <span className="thumb" aria-hidden />
      <span className="label">{theme === "dark" ? "Dark" : "Light"} mode</span>
    </button>
  );
}
