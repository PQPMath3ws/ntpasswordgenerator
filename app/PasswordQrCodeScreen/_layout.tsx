import { NativeStackNavigationOptions, Stack } from "expo-router";

import SnackBarProvider from "../../providers/snackBarProvider";

export default function PasswordQrCodeScreenLayout() {
  const stackScreenOptions: NativeStackNavigationOptions = {
    headerShown: false,
  };

  return (
    <SnackBarProvider>
      <Stack screenOptions={stackScreenOptions}>
        <Stack.Screen name="index" />
      </Stack>
    </SnackBarProvider>
  );
}
