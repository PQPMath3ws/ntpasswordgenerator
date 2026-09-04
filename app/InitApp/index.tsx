import { Redirect } from "expo-router";
import { hide, preventAutoHideAsync, setOptions } from "expo-splash-screen";
import { useEffect } from "react";

import { useSettings } from "../../contexts/useSettings";

setOptions({
  fade: false,
});

preventAutoHideAsync();

export default function InitApp() {
  const { settings } = useSettings();

  function initializeApp() {
    setTimeout(() => {
      hide();
    }, 450);
  }

  useEffect(() => {
    if (settings) {
      initializeApp();
    }
  }, [settings]);

  if (!settings) {
    return null;
  }

  return <Redirect href="/AppTabs/GeneratePasswordScreen" />;
}
