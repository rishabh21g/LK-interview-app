import { Stack } from "expo-router";

const RescheduleLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="[interviewId]"
        options={{ title: "Reschedule Interview" }}
      />
    </Stack>
  );
};

export default RescheduleLayout;
