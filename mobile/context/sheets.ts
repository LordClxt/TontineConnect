import { createContext, useContext } from "react";

export interface SheetActions {
  openRecharger: () => void;
  openRetirer: () => void;
}

const noop = () => {};

// Séparé des écrans pour éviter les imports circulaires écran ↔ header
export const SheetsContext = createContext<SheetActions>({
  openRecharger: noop,
  openRetirer: noop,
});

export const useSheets = () => useContext(SheetsContext);
