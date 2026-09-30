import { PropsWithChildren, useReducer } from "react";

import DeveloperInfoModal from "../components/DeveloperInfoModal";
import { DeveloperInfoModalContext } from "../contexts/useDeveloperInfo";

export default function DeveloperInfoModalProvider({
  children,
}: PropsWithChildren) {
  const [isDeveloperModalOpened, toggleIsDeveloperModalOpened] = useReducer<
    boolean,
    []
  >((x) => !x, false);

  function showDeveloperInfoModal(): void {
    if (!isDeveloperModalOpened) {
      toggleIsDeveloperModalOpened();
    }
  }

  return (
    <DeveloperInfoModalContext.Provider value={{ showDeveloperInfoModal }}>
      {children}
      {isDeveloperModalOpened && (
        <DeveloperInfoModal
          dismiss={() => {
            if (isDeveloperModalOpened) {
              toggleIsDeveloperModalOpened();
            }
          }}
          visible={isDeveloperModalOpened}
        />
      )}
    </DeveloperInfoModalContext.Provider>
  );
}
