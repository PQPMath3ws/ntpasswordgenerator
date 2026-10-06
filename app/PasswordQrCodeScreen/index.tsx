import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { setStringAsync } from "expo-clipboard";
import { aesEncryptAsync, AESEncryptionKey } from "expo-crypto";
import { useLocalSearchParams, useRouter } from "expo-router";
import { shareAsync } from "expo-sharing";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import ViewShot, { ViewShotRef } from "react-native-view-shot";

import UserDimensions from "../../constants/dimensions";
import { useLanguage } from "../../contexts/useLanguage";
import { useSnackBar } from "../../contexts/useSnackBar";
import styles from "./styles";

export default function PasswordQrCodeScreen() {
  const { password } = useLocalSearchParams();
  const router = useRouter();
  const { textsList } = useLanguage();
  const { showSnackBar } = useSnackBar();

  const [passwordValue, setPasswordValue] = useState<string>(
    password as string,
  );
  const [isQrCodeInPlainText, setIsQrCodeInPlainText] = useState<boolean>(true);
  const [encryptionPasswordKey, setEncryptionPasswordKey] =
    useState<string>("");

  const viewShotRefToCapture = useRef<ViewShotRef>(null);

  async function generateQrCodeValue(): Promise<void> {
    if (isQrCodeInPlainText) {
      setEncryptionPasswordKey("");
      setPasswordValue(password as string);
      return;
    }

    try {
      const encryptionKey = await AESEncryptionKey.generate();
      setEncryptionPasswordKey(await encryptionKey.encoded("base64"));
      const sealedData = await aesEncryptAsync(
        password as string,
        encryptionKey,
      );
      setPasswordValue(await sealedData.combined("base64"));
    } catch {
      setEncryptionPasswordKey("");
      setIsQrCodeInPlainText(true);
    }
  }

  async function shareQrCode(): Promise<void> {
    if (viewShotRefToCapture.current) {
      const viewPhotoUri = await viewShotRefToCapture.current.capture();
      await shareAsync(viewPhotoUri);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    generateQrCodeValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isQrCodeInPlainText]);

  return (
    <SafeAreaView style={styles.mainView}>
      <ScrollView
        style={styles.containerScrollView}
        contentContainerStyle={styles.contentContainerScrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.fullWidthView, styles.headerView]}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="arrow-back"
              size={UserDimensions.widthMultiplier * 6.5}
              color="#63AD58"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={async () => await shareQrCode()}>
            <FontAwesome
              name="share-alt"
              size={UserDimensions.widthMultiplier * 6.5}
              color="#63AD58"
            />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.qrCodePasswordInfoView,
            isQrCodeInPlainText
              ? styles.qrCodePasswordInfoViewWithoutEncryption
              : styles.qrCodePasswordInfoViewWithEncryption,
          ]}
        >
          <View>
            <FontAwesome
              name={isQrCodeInPlainText ? "unlock" : "lock"}
              size={UserDimensions.widthMultiplier * 5}
              color={isQrCodeInPlainText ? "#CE2929" : "#63AD58"}
            />
          </View>
          <View style={styles.qrCodePasswordInfoViewTextsView}>
            <Text
              style={[
                styles.qrCodePasswordInfoViewTitleText,
                isQrCodeInPlainText
                  ? styles.qrCodePasswordInfoViewTextWithoutEncryption
                  : styles.qrCodePasswordInfoViewTextWithEncryption,
              ]}
            >
              {
                textsList[
                  isQrCodeInPlainText
                    ? "noEncryptionTitleText"
                    : "withEncryptionTitleText"
                ]
              }
            </Text>
            <Text
              style={[
                styles.qrCodePasswordInfoViewMessageText,
                isQrCodeInPlainText
                  ? styles.qrCodePasswordInfoViewTextWithoutEncryption
                  : styles.qrCodePasswordInfoViewTextWithEncryption,
              ]}
            >
              {
                textsList[
                  isQrCodeInPlainText
                    ? "noEncryptionMessageText"
                    : "withEncryptionMessageText"
                ]
              }
            </Text>
          </View>
        </View>
        <ViewShot
          ref={viewShotRefToCapture}
          options={{ format: "jpg", quality: 1, result: "tmpfile" }}
        >
          <QRCode
            value={passwordValue}
            size={UserDimensions.widthMultiplier * 65}
            color="#63AD58"
            backgroundColor="transparent"
          />
        </ViewShot>
        <View style={styles.encryptPasswordInfoView}>
          <View>
            <FontAwesome
              name="lock"
              size={UserDimensions.widthMultiplier * 5}
              color="#5A61CF"
            />
          </View>
          <View style={styles.encryptPasswordInfoViewTextsView}>
            <Text style={styles.encryptPasswordInfoViewTitleText}>
              {textsList["encryptPasswordTitleText"]}
            </Text>
            <Text style={styles.encryptPasswordInfoViewMessageText}>
              {textsList["encryptPasswordMessageText"]}
            </Text>
          </View>
          <View>
            <Switch
              trackColor={{ false: "#CE2929", true: "#5A61CF" }}
              thumbColor={isQrCodeInPlainText ? "#CE2929" : "#5A61CF"}
              onValueChange={(value) => setIsQrCodeInPlainText(!value)}
              value={!isQrCodeInPlainText}
              style={styles.encryptPasswordInfoViewSwitch}
            />
          </View>
        </View>
        {encryptionPasswordKey && (
          <View style={styles.passwordHashKeyInfoView}>
            <View
              style={[
                styles.flexDirectionRowView,
                styles.passwordHashKeyInfoViewHeaderView,
              ]}
            >
              <Ionicons
                name="key"
                size={UserDimensions.widthMultiplier * 5}
                color="#63AD58"
              />
              <Text style={styles.passwordHashKeyInfoViewHeaderViewText}>
                {textsList["decryptionKeyText"]}
              </Text>
            </View>
            <View>
              <Text style={styles.passwordHashKeyInfoViewContentViewText}>
                {encryptionPasswordKey}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.copyHashKeyTouchableOpacity}
                onPress={async () => {
                  await setStringAsync(encryptionPasswordKey);
                  showSnackBar(
                    <FontAwesome5 name="clipboard-check" />,
                    textsList["successCopyContentText"],
                  );
                }}
              >
                <MaterialIcons
                  name="content-copy"
                  size={UserDimensions.widthMultiplier * 5}
                  color="#080808"
                />
                <Text style={styles.copyHashKeyTouchableOpacityText}>
                  {textsList["copyDecryptionKeyText"]}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View>
          <TouchableOpacity
            style={styles.copyHashKeyTouchableOpacity}
            onPress={async () => await shareQrCode()}
          >
            <FontAwesome
              name="share-alt"
              size={UserDimensions.widthMultiplier * 5}
              color="#080808"
            />
            <Text style={styles.copyHashKeyTouchableOpacityText}>
              {textsList["shareQrCodeText"]}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
