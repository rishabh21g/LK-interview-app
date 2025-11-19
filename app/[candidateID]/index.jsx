import React, { useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import { Stack, useLocalSearchParams, router } from "expo-router";
import { useAuth } from "../../context/AuthContext.jsx";

const Profile = () => {
  const { userDetails, loading, signOut } = useAuth();
  const { candidateID } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const theme = useMemo(
    () => ({
      bg: isDark ? "bg-dark" : "bg-light",
      text: isDark ? "text-dark" : "text-light",
      icon: isDark ? "text-dark-icon" : "text-light-icon",
      tintText: isDark ? "text-dark-tint" : "text-light-tint",
      tabDefaultText: isDark
        ? "text-dark-tab-default"
        : "text-light-tab-default",
      tabSelectedText: isDark
        ? "text-dark-tab-selected"
        : "text-light-tab-selected",
    }),
    [isDark],
  );

  const initials = useMemo(() => {
    const name = userDetails?.name || userDetails?.email || "";
    if (!name) return "?";
    const parts = String(name).trim().split(/\s+/);
    const picked = (parts[0]?.[0] || "") + (parts[1]?.[0] || "");
    return picked.toUpperCase() || "?";
  }, [userDetails]);

  const mismatch = useMemo(() => {
    const currentId = String(candidateID || "").trim();
    const userId = String(userDetails?.candidateId || "").trim();
    return !!(currentId && userId && currentId !== userId);
  }, [candidateID, userDetails]);

  if (loading) {
    return (
      <View className={`${theme.bg} flex-1 items-center justify-center`}>
        <ActivityIndicator size="large" color={"#f49b33"} />
        <Text className={`${theme.text} mt-3`}>Loading your profile...</Text>
      </View>
    );
  }

  const name = userDetails?.name || "Guest";
  const email = userDetails?.email || "N/A";
  const phone = userDetails?.phone || "N/A";
  const userId = userDetails?.candidateId || "N/A";

  return (
    <View className={`${theme.bg} flex-1`}>
      <Stack.Screen options={{ title: "Profile" }} />

      {/* Top Banner if route ID != user ID */}
      {mismatch && (
        <View className={`bg-primary px-4 py-3`}>
          <Text className={`text-white font-medium`}>
            You’re viewing a different candidate route.
          </Text>
          <Pressable
            onPress={() => router.replace(`/${userDetails?.candidateId}`)}
            className="mt-2 self-start bg-white px-3 py-2 rounded-lg"
          >
            <Text className="text-secondary font-semibold">
              Go to my profile
            </Text>
          </Pressable>
        </View>
      )}

      <View className="px-5 py-6">
        {/* Header */}
        <View className="flex-row items-center">
          <View className="w-20 h-20 rounded-full bg-primary items-center justify-center">
            <Text className="text-white text-2xl font-semibold">
              {initials}
            </Text>
          </View>
          <View className="ml-4">
            <Text className={`${theme.text} text-2xl font-semibold`}>
              {name}
            </Text>
            <Text className={`${theme.tabDefaultText} mt-1`}>
              Candidate Profile
            </Text>
          </View>
        </View>

        {/* Profile Details Card */}
        <View className="mt-6 border border-primary rounded-2xl p-5">
          <Text className={`${theme.tintText} text-base font-semibold`}>
            Account
          </Text>

          <View className="mt-4">
            <Text className={`${theme.tabDefaultText} text-xs uppercase`}>
              Email
            </Text>
            <Text className={`${theme.text} text-base`}>{email}</Text>
          </View>

          <View className="mt-4">
            <Text className={`${theme.tabDefaultText} text-xs uppercase`}>
              Phone
            </Text>
            <Text className={`${theme.text} text-base`}>{phone}</Text>
          </View>

          <View className="mt-4">
            <Text className={`${theme.tabDefaultText} text-xs uppercase`}>
              Candidate ID
            </Text>
            <Text className={`${theme.text} text-base`}>{userId}</Text>
          </View>
        </View>

        {/* Actions */}
        <View className="mt-6">
          <Pressable
            onPress={signOut}
            className="bg-primary px-5 py-3 rounded-xl items-center"
          >
            <Text className="text-white font-semibold">Sign out</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Profile;
