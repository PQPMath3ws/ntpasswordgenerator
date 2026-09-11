import { BagelFatOne_400Regular } from "@expo-google-fonts/bagel-fat-one";
import {
  Quantico_400Regular,
  Quantico_700Bold,
} from "@expo-google-fonts/quantico";
import { loadAsync } from "expo-font";
import { Redirect } from "expo-router";
import { hide, preventAutoHideAsync, setOptions } from "expo-splash-screen";
import { useEffect, useState } from "react";
import { BackHandler } from "react-native";

import { useSettings } from "../../contexts/useSettings";

setOptions({
  fade: false,
});

preventAutoHideAsync();

export default function InitApp() {
  const { settings } = useSettings();

  const [allFontsLoaded, setAllFontsLoaded] = useState<boolean>(false);

  async function initializeApp() {
    try {
      await loadAsync({
        BagelFatOne_400Regular,
        Quantico_400Regular,
        Quantico_700Bold,
      });
      setAllFontsLoaded(true);
      setTimeout(() => {
        hide();
      }, 450);
    } catch {
      BackHandler.exitApp();
    }
  }

  useEffect(() => {
    if (settings) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      initializeApp();
    }
  }, [settings]);

  if (!allFontsLoaded) {
    return null;
  }

  return <Redirect href="/AppTabs/GeneratePasswordScreen" />;
}
