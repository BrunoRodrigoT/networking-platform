import React, { ReactNode, createContext, useContext } from "react";
import theme from "@utils/colors";

type Theme = typeof theme;

const ThemeContext = createContext<Theme>(theme);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

function useTheme() {
  return useContext(ThemeContext);
}

export { useTheme, ThemeContext, ThemeProvider };
