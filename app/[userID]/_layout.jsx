import { Stack } from "expo-router";

const UserLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="result" options={{ title: "Interview Results" }} />
    </Stack>
  );
};

export default UserLayout;
