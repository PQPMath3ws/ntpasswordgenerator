import { ActionDispatch, createContext, useContext } from "react";

import DialogPopupInterface from "../types/dialogPopup";

interface DialogPopupContextInterface {
  closeDialogModal: ActionDispatch<[]>;
  showDialogPopupModal: (data: DialogPopupInterface) => void;
}

export const DialogPopupContext = createContext<DialogPopupContextInterface>(
  {} as DialogPopupContextInterface,
);

export const useDialogPopup = () =>
  useContext<DialogPopupContextInterface>(DialogPopupContext);
