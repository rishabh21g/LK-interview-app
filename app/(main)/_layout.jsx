import { Stack } from "expo-router";

const AppLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
    
      <Stack.Screen
        name="home"
        options={{ title: "Home"}}
       />
     <Stack.Screen name="[id]" options={{title:"Interview Started"}}/>
    </Stack>
  );
};

export default AppLayout;
