import { Stack } from "expo-router";

const AppLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" options={{ title: "Home" }} />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Interview Started",
          gestureEnabled: false, // Disable swipe to dismiss
          headerBackVisible: false, //  remove back button
          presentation: "modal", // Present as modal
        }}
      />
    </Stack>
  );
};

export default AppLayout;
