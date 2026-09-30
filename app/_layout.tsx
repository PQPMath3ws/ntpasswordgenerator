import { NativeStackNavigationOptions, Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import IapProvider from "../providers/iapProvider";
import LanguageProvider from "../providers/languageProvider";
import SettingsProvider from "../providers/settingsProvider";

export default function AppLayout() {
  const stackScreenOptions: NativeStackNavigationOptions = {
    headerShown: false,
  };

  return (
    <GestureHandlerRootView>
      <SettingsProvider>
        <LanguageProvider>
          <IapProvider>
            <Stack screenOptions={stackScreenOptions}>
              <Stack.Screen name="InitApp" />
              <Stack.Screen name="AppTabs" />
            </Stack>
          </IapProvider>
        </LanguageProvider>
      </SettingsProvider>
    </GestureHandlerRootView>
  );
}
