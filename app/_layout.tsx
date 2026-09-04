import { NativeStackNavigationOptions, Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
          <Stack screenOptions={stackScreenOptions}>
            <Stack.Screen name="InitApp" />
            <Stack.Screen name="AppTabs" />
          </Stack>
        </LanguageProvider>
      </SettingsProvider>
    </GestureHandlerRootView>
  );
}
