import { PropsWithChildren, useState } from "react";

import SnackBarParent from "../components/SnackBarParent";
import { SnackBarContext } from "../contexts/useSnackBar";
import IconsType from "../types/icons";
import SnackBarComponentInterface from "../types/snackbar";

export default function SnackBarProvider({ children }: PropsWithChildren) {
  const [snackBarComponentsList, setSnackBarComponentsList] = useState<
    SnackBarComponentInterface[]
  >([]);

  function showSnackBar(icon: IconsType, message: string) {
    setSnackBarComponentsList((prev) => {
      const newArr: SnackBarComponentInterface[] = [...prev];
      newArr.push({ id: new Date().getTime(), icon, message });
      return newArr;
    });
  }

  function removeSnackBar(id: number) {
    const indexToRemove: number = snackBarComponentsList.findIndex(
      (sbc) => sbc.id === id,
    );
    if (indexToRemove !== -1) {
      const newArr = [...snackBarComponentsList];
      newArr.splice(indexToRemove, 1);
      setSnackBarComponentsList(newArr);
    }
  }

  return (
    <SnackBarContext.Provider value={{ showSnackBar }}>
      {children}
      <SnackBarParent list={snackBarComponentsList} remove={removeSnackBar} />
    </SnackBarContext.Provider>
  );
}
