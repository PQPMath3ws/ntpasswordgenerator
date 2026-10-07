import { AntDesign } from "@expo/vector-icons";
import { useIAP, UseIAPOptions } from "expo-iap";
import { PropsWithChildren, useEffect } from "react";

import DataKeys from "../constants/data_keys";
import { InAppPurchaseContext } from "../contexts/useIap";
import { useLanguage } from "../contexts/useLanguage";
import { useSettings } from "../contexts/useSettings";
import emitterEvent from "../events/emitterEvent";
import storeLocalSecureData from "../services/storeLocalSecureData";

const productsIds = ["ntpasswordgenerator_unlock_vip_content_in_app"];

export default function IapProvider({ children }: PropsWithChildren) {
  const {
    availablePurchases,
    connected,
    fetchProducts,
    getAvailablePurchases,
    requestPurchase,
  } = useIAP(getIapSettings());
  const { textsList } = useLanguage();
  const { refreshSettings } = useSettings();

  async function purchaseVipVersion() {
    if (connected) {
      try {
        await requestPurchase({
          type: "in-app",
          request: {
            apple: {
              sku: productsIds[0],
            },
            google: {
              skus: [productsIds[0]],
            },
          },
        });
      } catch {}
    } else {
      emitterEvent.emit("showDialogPopupModal", {
        title: textsList["connectionErrorTitleText"],
        message: textsList["connectionErrorMessageText"],
        actionButtonColor: "#080808",
        actionButtonText: textsList["closeText"],
        actionButtonTextColor: "#FFFFFF",
        actionButtonOnPress: () => {
          emitterEvent.emit("closeDialogModal");
        },
      });
    }
  }

  async function restoreVipVersion() {
    if (connected) {
      try {
        availablePurchases.forEach(async (purchase) => {
          const index = productsIds.findIndex(
            (productId) => productId === purchase.productId,
          );
          if (index !== -1) {
            if (index === 0 && purchase.purchaseState === "purchased") {
              await storeLocalSecureData.setSecureData(
                DataKeys.has_full_version,
                "1",
              );
              await refreshSettings();
            }
          }
        });
      } catch {}
    }
  }

  function getIapSettings(): UseIAPOptions {
    const iapSettings: UseIAPOptions = {
      onPurchaseSuccess: async (purchase) => {
        if (
          purchase.productId === productsIds[0] &&
          purchase.purchaseState === "purchased"
        ) {
          await storeLocalSecureData.setSecureData(
            DataKeys.has_full_version,
            "1",
          );
          await refreshSettings();
          emitterEvent.emit("showDialogPopupModal", {
            headerIcon: <AntDesign name="check-circle" color="green" />,
            title: textsList["successBuyProTitleText"],
            message: textsList["successBuyProMessageText"],
            actionButtonColor: "#080808",
            actionButtonText: textsList["closeText"],
            actionButtonTextColor: "#FFFFFF",
            actionButtonOnPress: () => {
              emitterEvent.emit("closeDialogModal");
            },
          });
        }
      },
      onPurchaseError: async (error) => {
        if (error.code && error.code === "already-owned") {
          await storeLocalSecureData.setSecureData(
            DataKeys.has_full_version,
            "1",
          );
          await refreshSettings();
          emitterEvent.emit("showDialogPopupModal", {
            headerIcon: <AntDesign name="check-circle" color="green" />,
            title: textsList["successBuyProTitleText"],
            message: textsList["successBuyProMessageText"],
            actionButtonColor: "#080808",
            actionButtonText: textsList["closeText"],
            actionButtonTextColor: "#FFFFFF",
            actionButtonOnPress: () => {
              emitterEvent.emit("closeDialogModal");
            },
          });
        } else {
          emitterEvent.emit("showDialogPopupModal", {
            title: textsList["purchaseVipTitleErrorText"],
            message: textsList["purchaseVipMessageErrorText"],
            actionButtonColor: "#080808",
            actionButtonText: textsList["closeText"],
            actionButtonTextColor: "#FFFFFF",
            actionButtonOnPress: () => {
              emitterEvent.emit("closeDialogModal");
            },
          });
        }
      },
    };
    return iapSettings;
  }

  function getPurchaseToken() {
    if (connected) {
      let purchaseToken: string | undefined = undefined;
      for (const purchase of availablePurchases) {
        if (
          purchase.productId === productsIds[0] &&
          purchase.purchaseState === "purchased"
        ) {
          if (purchase.purchaseToken) {
            purchaseToken = purchase.purchaseToken;
            break;
          }
        }
      }
      return purchaseToken;
    }

    return undefined;
  }

  useEffect(() => {
    if (connected) {
      fetchProducts({ skus: productsIds, type: "in-app" });
      getAvailablePurchases({
        includeSuspendedAndroid: false,
        onlyIncludeActiveItemsIOS: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected]);

  return (
    <InAppPurchaseContext.Provider
      value={{ purchaseVipVersion, restoreVipVersion, getPurchaseToken }}
    >
      {children}
    </InAppPurchaseContext.Provider>
  );
}
