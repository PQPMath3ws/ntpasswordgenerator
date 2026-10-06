import { AntDesign, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import {
  defaultOptions,
  Options,
  passwordStrength,
} from "check-password-strength";
import { setStringAsync } from "expo-clipboard";
import { useRouter } from "expo-router";
import { Text, TextStyle, TouchableOpacity, View } from "react-native";

import { useLanguage } from "../../contexts/useLanguage";
import { useSnackBar } from "../../contexts/useSnackBar";
import Divider from "../Divider";
import styles from "./styles";

interface PasswordBoxViewerAndCheckerInterface {
  password: string;
}

export default function PasswordBoxViewerAndChecker({
  password,
}: PasswordBoxViewerAndCheckerInterface) {
  const router = useRouter();
  const { textsList } = useLanguage();
  const { showSnackBar } = useSnackBar();

  if (!textsList || Object.keys(textsList).length === 0) {
    throw new Error(
      "Configure the app correctly to load all texts translations first to use this component",
    );
  }

  const passwordStrengthSettings: Options<string> = [...defaultOptions];
  passwordStrengthSettings[2].minDiversity = 3;

  const passwordStrengthValue = passwordStrength(
    password,
    passwordStrengthSettings,
  ).value;
  const passwordStrengthViewTextStyleList: Record<string, TextStyle> = {
    "Too weak": styles.insecurePasswordViewText,
    Weak: styles.insecurePasswordViewText,
    Medium: styles.partialSecurePasswordViewText,
    Strong: styles.securePasswordViewText,
  };
  const passwordStrengthTextList: Record<string, string> = {
    "Too weak": "weakPasswordText",
    Weak: "weakPasswordText",
    Medium: "mediumPasswordText",
    Strong: "strongPasswordText",
  };

  return (
    <View style={styles.mainView}>
      <Text style={styles.passwordGeneratedText}>
        {`${textsList["generatedPasswordText"].toUpperCase()}:`}
      </Text>
      <View style={styles.infosView}>
        <View style={styles.infosLeftView}>
          <Text style={styles.passwordText}>{password}</Text>
        </View>
        <View style={styles.infosRightView}>
          <TouchableOpacity
            style={styles.qrCodeTouchableOpacity}
            onPress={() => {
              router.navigate({
                pathname: "/PasswordQrCodeScreen",
                params: { password },
              });
            }}
          >
            <AntDesign
              name="qrcode"
              style={styles.qrCodeTouchableOpacityIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.copyTouchableOpacity}
            onPress={async () => {
              await setStringAsync(password);
              showSnackBar(
                <FontAwesome5 name="clipboard-check" />,
                textsList["successCopyContentText"],
              );
            }}
          >
            <FontAwesome6 name="copy" style={styles.copyTouchableOpacityIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <Divider color="#3E6A3D" style={styles.dividerView} />
      <View style={styles.passwordStatusView}>
        <Text style={passwordStrengthViewTextStyleList[passwordStrengthValue]}>
          {textsList[
            passwordStrengthTextList[passwordStrengthValue]
          ].toUpperCase()}
        </Text>
        <View></View>
      </View>
    </View>
  );
}
