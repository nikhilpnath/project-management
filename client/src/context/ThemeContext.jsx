import { createContext } from "react";

export const ThemeContext = createContext({
  //structure and deafult value - for better autocomplete and type hints.
  theme: false,
  setTheme: () => {},
});
