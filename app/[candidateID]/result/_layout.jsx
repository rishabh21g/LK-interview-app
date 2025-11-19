import { Stack } from "expo-router";

const ResultLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="[interviewId]"
        options={{ title: "Interview Result Details" }}
      />
    </Stack>
  );
};

export default ResultLayout;
