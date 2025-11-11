import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const getAccessToken = async () => {
  let access_token;
  if (Platform.OS === "web") {
    access_token = await AsyncStorage.getItem("access_token");
  } else {
    access_token = await SecureStore.getItemAsync("access_token");
  }
  return access_token;
};
export const deleteAccessToken = async () => {
  if (Platform.OS === "web") {
    await AsyncStorage.removeItem("access_token");
  } else {
    await SecureStore.deleteItemAsync("access_token");
  }
};

export const setAccessToken = async (token) => {
  if (Platform.OS === "web") {
    await AsyncStorage.setItem("access_token", token);
  } else {
    await SecureStore.setItemAsync("access_token", token);
  }
};

export default getAccessToken;
