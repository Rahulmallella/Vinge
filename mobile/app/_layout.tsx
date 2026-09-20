import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="filters" options={{ presentation: "modal" }} />
      <Stack.Screen name="matches" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}
