import { NativeStackNavigationOptions, Stack } from "expo-router";

export default function InitAppLayout() {
  const stackScreenOptions: NativeStackNavigationOptions = {
    headerShown: false,
  };

  return (
    <Stack screenOptions={stackScreenOptions}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
