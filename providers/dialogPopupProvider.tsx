import { AntDesign } from "@expo/vector-icons";
import { PropsWithChildren, useEffect, useReducer, useState } from "react";

import DialogPopup from "../components/DialogPopup";
import { DialogPopupContext } from "../contexts/useDialogPopup";
import emitterEvent from "../events/emitterEvent";
import DialogPopupInterface from "../types/dialogPopup";

const DEFAULT_DIALOG_POPUP_DATA: DialogPopupInterface = {
  title: "",
  message: "",
  actionButtonColor: "#63AD58",
  actionButtonText: "Fechar",
  actionButtonTextColor: "#FFFFFF",
  actionButtonOnPress: () => {},
};

export default function DialogPopupProvider({ children }: PropsWithChildren) {
  const [isDialogPopupVisible, toggleIsDialogPopupVisible] = useReducer<
    boolean,
    []
  >((x) => !x, false);

  const [dialogPopupData, setDialogPopupData] = useState<DialogPopupInterface>(
    DEFAULT_DIALOG_POPUP_DATA,
  );

  function showDialogPopupModal(data: DialogPopupInterface): void {
    if (data) {
      setDialogPopupData(data);
      if (!isDialogPopupVisible) {
        toggleIsDialogPopupVisible();
      }
    }
  }

  function closeDialogPopupModal() {
    setDialogPopupData(DEFAULT_DIALOG_POPUP_DATA);
    if (!isDialogPopupVisible) {
      toggleIsDialogPopupVisible();
    }
  }

  useEffect(() => {
    emitterEvent.on("closeDialogModal", closeDialogPopupModal);
    emitterEvent.on("showDialogPopupModal", showDialogPopupModal);

    return () => {
      emitterEvent.off("closeDialogModal", closeDialogPopupModal);
      emitterEvent.off("showDialogPopupModal", showDialogPopupModal);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DialogPopupContext.Provider
      value={{
        closeDialogModal: toggleIsDialogPopupVisible,
        showDialogPopupModal,
      }}
    >
      {children}
      {isDialogPopupVisible && (
        <DialogPopup
          visible={isDialogPopupVisible}
          headerColor="white"
          headerIcon={
            dialogPopupData.headerIcon ? (
              dialogPopupData.headerIcon
            ) : (
              <AntDesign name="close-circle" color="red" />
            )
          }
          title={dialogPopupData.title}
          message={dialogPopupData.message}
          actionButtonColor={dialogPopupData.actionButtonColor}
          actionButtonText={dialogPopupData.actionButtonText}
          actionButtonTextColor={dialogPopupData.actionButtonTextColor}
          actionButtonOnPress={dialogPopupData.actionButtonOnPress}
          userCanCloseModal={dialogPopupData.userCanCloseModal}
          userCloseModalButtonColor={dialogPopupData.userCloseModalButtonColor}
          userCloseModalButtonText={dialogPopupData.userCloseModalButtonText}
          userCloseModalButtonTextColor={
            dialogPopupData.userCloseModalButtonTextColor
          }
          onCloseModal={dialogPopupData.onCloseModal}
        />
      )}
    </DialogPopupContext.Provider>
  );
}
