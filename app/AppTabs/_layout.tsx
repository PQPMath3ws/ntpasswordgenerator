import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { Tabs } from "expo-router";
import { BottomTabNavigationOptions } from "expo-router/js-tabs";
import { useEffect } from "react";
import { Platform, View } from "react-native";
import MobileAds, {
  BannerAd,
  BannerAdSize,
} from "react-native-google-mobile-ads";

import TabBar from "../../components/TabBar";
import { useLanguage } from "../../contexts/useLanguage";
import { useSettings } from "../../contexts/useSettings";
import DeveloperInfoModalProvider from "../../providers/developerInfoModalProvider";
import DialogPopupProvider from "../../providers/dialogPopupProvider";
import SnackBarProvider from "../../providers/snackBarProvider";
import TabsDataInterface from "../../types/tabs";

export default function AppTabsLayout() {
  const { textsList } = useLanguage();
  const { settings } = useSettings();

  const tabsScreenOptions: BottomTabNavigationOptions = {
    headerShown: false,
  };

  const tabScreen: BottomTabNavigationOptions = {
    animation: "shift",
  };

  const allTabsData: TabsDataInterface[] = [
    {
      name: "GeneratePasswordScreen",
      label: textsList["generatePasswordText"],
      icon: <MaterialIcons name="password" />,
    },
    {
      name: "SettingsScreen",
      label: textsList["settingsText"],
      icon: <Ionicons name="settings" />,
    },
  ];

  useEffect(() => {
    MobileAds().initialize();
  }, []);

  return (
    <SnackBarProvider>
      <DeveloperInfoModalProvider>
        <DialogPopupProvider>
          {!settings?.has_full_version && !settings?.has_temp_full_version && (
            <View
              style={{
                backgroundColor: "#080808",
                paddingTop: Constants.statusBarHeight,
              }}
            >
              <BannerAd
                requestOptions={{
                  requestNonPersonalizedAdsOnly: true,
                  networkExtras: {
                    collapsible: "top",
                  },
                }}
                size={BannerAdSize.LARGE_ANCHORED_ADAPTIVE_BANNER}
                unitId={
                  Platform.OS === "ios"
                    ? ""
                    : process.env.EXPO_PUBLIC_ANDROID_APP_BANNER_ID!
                }
              />
            </View>
          )}
          <Tabs
            screenOptions={tabsScreenOptions}
            tabBar={(props) => <TabBar allTabsData={allTabsData} {...props} />}
          >
            {allTabsData.map((tabData) => (
              <Tabs.Screen
                key={tabData.name}
                name={tabData.name}
                options={tabScreen}
              />
            ))}
          </Tabs>
        </DialogPopupProvider>
      </DeveloperInfoModalProvider>
    </SnackBarProvider>
  );
}
