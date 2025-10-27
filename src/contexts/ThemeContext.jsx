import React, { createContext, useEffect, useState } from "react";

// Create a context object
export const ThemeContext = createContext();

// Create a provider component
export const ThemeProvider = ({ children }) => {
  // default theme is light
  const [theme, setTheme] = useState("light");

  // Load theme from local storage when page mounts
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Apply theme when theme state was changed or updated
  useEffect(() => {
    localStorage.setItem("theme", theme);

    // Remove both classes first, then add the correct one
    document.documentElement.classList.remove("theme-dark", "theme-light");
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
