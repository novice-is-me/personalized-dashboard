import React, { createContext, useEffect, useState } from "react";

// Create a context object
export const ThemeContext = createContext();

// Create a provider component
export const ThemeProvider = ({ children }) => {
  // default theme is light
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply theme when theme state was changed or update
  useEffect(() => {
    localStorage.setItem("theme", theme);

    const html = document.documentElement;

    // Remove ALL classes that start with "theme-"
    html.classList.forEach((className) => {
      if (className.startsWith("theme-")) {
        html.classList.remove(className);
      }
    });

    // Add the new theme class
    html.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
