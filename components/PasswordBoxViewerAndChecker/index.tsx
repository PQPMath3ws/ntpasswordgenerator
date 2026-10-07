import {
  AntDesign,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
} from "@expo/vector-icons";
import {
  defaultOptions,
  Options,
  passwordStrength,
} from "check-password-strength";
import { setStringAsync } from "expo-clipboard";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  Platform,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import {
  RewardedAd,
  RewardedAdEventType,
} from "react-native-google-mobile-ads";

import DataKeys from "../../constants/data_keys";
import { useDialogPopup } from "../../contexts/useDialogPopup";
import { useLanguage } from "../../contexts/useLanguage";
import { useSettings } from "../../contexts/useSettings";
import { useSnackBar } from "../../contexts/useSnackBar";
import StoreLocalSecureData from "../../services/storeLocalSecureData";
import Divider from "../Divider";
import styles from "./styles";

interface PasswordBoxViewerAndCheckerInterface {
  password: string;
}

const rewarded = RewardedAd.createForAdRequest(
  Platform.OS === "ios" ? "" : process.env.EXPO_PUBLIC_ANDROID_APP_REWARD_ID!,
);

export default function PasswordBoxViewerAndChecker({
  password,
}: PasswordBoxViewerAndCheckerInterface) {
  const router = useRouter();
  const { closeDialogModal, showDialogPopupModal } = useDialogPopup();
  const { textsList } = useLanguage();
  const { refreshSettings, settings } = useSettings();
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

  useEffect(() => {
    const rewardUnlistener = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      async (_) => {
        const now = new Date();
        now.setHours(now.getHours() + 6);
        await StoreLocalSecureData.setSecureData(
          DataKeys.last_datetime_temp_pro_features,
          now.getTime().toString(),
        );
        await StoreLocalSecureData.setSecureData(
          DataKeys.has_temp_full_version,
          "1",
        );
        await refreshSettings();
        router.navigate({
          pathname: "/PasswordQrCodeScreen",
          params: { password },
        });
      },
    );

    rewarded.load();

    return () => {
      rewardUnlistener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

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
              if (
                settings &&
                (settings.has_full_version || settings.has_temp_full_version)
              ) {
                router.navigate({
                  pathname: "/PasswordQrCodeScreen",
                  params: { password },
                });
              } else {
                showDialogPopupModal({
                  headerIcon: <Ionicons name="alert-circle" color="#CE2929" />,
                  title: textsList["opsProVersionTitleText"],
                  message: textsList["opsProVersionMessageText"],
                  actionButtonColor: "#CE2929",
                  actionButtonText: textsList["watchAdText"],
                  actionButtonTextColor: "#FFFFFF",
                  actionButtonOnPress: async () => {
                    closeDialogModal();
                    await rewarded.show();
                  },
                  userCanCloseModal: true,
                  userCloseModalButtonColor: "#080808",
                  userCloseModalButtonText: textsList["closeText"],
                  userCloseModalButtonTextColor: "#FFFFFF",
                  onCloseModal: () => {
                    closeDialogModal();
                  },
                });
              }
            }}
          >
            <AntDesign
              name="qrcode"
              style={styles.qrCodeTouchableOpacityIcon}
            />
            {!settings!.has_full_version &&
              !settings!.has_temp_full_version && (
                <View style={styles.lockedQrCodeTouchableOpacityView}>
                  <FontAwesome5
                    name="lock"
                    style={styles.lockedQrCodeTouchableOpacityViewIcon}
                  />
                </View>
              )}
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
      </View>
    </View>
  );
}
