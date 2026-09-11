import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { BottomTabNavigationOptions } from "expo-router/js-tabs";

import TabBar from "../../components/TabBar";
import { useLanguage } from "../../contexts/useLanguage";
import SnackBarProvider from "../../providers/snackBarProvider";
import TabsDataInterface from "../../types/tabs";

export default function AppTabsLayout() {
  const { textsList } = useLanguage();

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

  return (
    <SnackBarProvider>
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
    </SnackBarProvider>
  );
}
