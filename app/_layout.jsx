import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "../context/AuthContext";
import { InterviewProvider } from "../context/InterviewContext";

import "../global.css";
export default function RootLayout() {
  return (
    <>
      <AuthProvider>
        <InterviewProvider>
          <StatusBar
            style="light"
            translucent={true}
            animated={true}
            networkActivityIndicatorVisible={true}
            statusBarStyle="auto"
          />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(main)" />
            <Stack.Screen name="[userID]" />
          </Stack>
        </InterviewProvider>
      </AuthProvider>
    </>
  );
}
