import { createContext, useContext } from "react";

interface DeveloperInfoModalContextInterface {
  showDeveloperInfoModal: () => void;
}

export const DeveloperInfoModalContext =
  createContext<DeveloperInfoModalContextInterface>(
    {} as DeveloperInfoModalContextInterface,
  );

export const useDeveloperInfo = () =>
  useContext<DeveloperInfoModalContextInterface>(DeveloperInfoModalContext);
