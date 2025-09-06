import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import Login from "../app/(auth)/login";
export default function Index() {
  const router = useRouter();
  const { authToken, loading } = useAuth();

  //check token
  useEffect(() => {
    if (!loading) {
      if (authToken) {
        router.replace("/(main)/home");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken, loading]);

  // laoding state ui
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }
  return (
  <Login/>
  );
}
