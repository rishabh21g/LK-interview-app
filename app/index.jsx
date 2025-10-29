import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Alert, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { authToken, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (authToken) {
      router.replace("/home");
    } else {
      Alert.alert("Not authenticated", "Please log in to continue.");
      router.replace("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken, loading]);
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }
  return null;
}
