import { createContext, useContext } from "react";

interface InAppPurchaseInterface {
  purchaseVipVersion: () => Promise<void>;
  restoreVipVersion: () => Promise<void>;
  getPurchaseToken: () => string | undefined;
}

export const InAppPurchaseContext = createContext<InAppPurchaseInterface>(
  {} as InAppPurchaseInterface,
);

export const useIap = () =>
  useContext<InAppPurchaseInterface>(InAppPurchaseContext);
