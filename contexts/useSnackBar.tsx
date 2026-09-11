import { createContext, useContext } from "react";

import IconsType from "../types/icons";

interface SnackBarContextInterface {
  showSnackBar: (icon: IconsType, message: string) => void;
}

export const SnackBarContext = createContext<SnackBarContextInterface>(
  {} as SnackBarContextInterface,
);

export const useSnackBar = () =>
  useContext<SnackBarContextInterface>(SnackBarContext);
