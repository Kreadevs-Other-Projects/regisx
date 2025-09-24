import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
  <>
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#fff" },
        animation: "fade_from_bottom",
      }}
    >
      <Stack.Screen name="index" />;
      <Stack.Screen name="tokenScreen" />
    </Stack>
    <StatusBar style="dark" />
  </>

)}
