import { View } from "react-native";

import SnackBarComponentInterface from "../../types/snackbar";
import SnackBarComponent from "../SnackBarComponent";
import styles from "./styles";

interface SnackBarParentInterface {
  list: SnackBarComponentInterface[];
  remove: (id: number) => void;
}

export default function SnackBarParent({
  list,
  remove,
}: SnackBarParentInterface) {
  return (
    <View pointerEvents="box-none" style={styles.mainView}>
      <View style={styles.containerView}>
        {list.map((sbc, index) => (
          <SnackBarComponent
            callback={() => remove(sbc.id)}
            id={sbc.id}
            icon={sbc.icon}
            key={`snackBar-component-${index}-${new Date().getTime()}`}
            message={sbc.message}
          />
        ))}
      </View>
    </View>
  );
}
