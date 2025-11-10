import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userDetails, setuserDetails] = useState({
    name: null,
    email: null,
    candidateId: null,
    phone: null,
  });

  const [authToken, setauthToken] = useState(null);
  const [loading, setloading] = useState(true);

  //logout and clear auth state
  const clearAuthState = async () => {
    try {
      if (Platform.OS !== "web") {
        await SecureStore.deleteItemAsync("access_token");
      } else {
        await AsyncStorage.removeItem("access_token");
      }
      await AsyncStorage.removeItem("userDetails");
      setauthToken(null);
      setuserDetails({
        name: null,
        email: null,
        candidateId: null,
        phone: null,
      });
      router.push("/login");
    } catch (err) {
      console.log("Error while logging out:", err);
      Alert.alert("Error while logging out", err.message);
    }
  };

  //verify auth token and user details from storage
  const verifyAuthTokenandUser = async () => {
    setloading(true);
    try {
      let savedToken;
      if (Platform.OS === "web") {
        savedToken = await AsyncStorage.getItem("access_token");
      } else {
        savedToken = await SecureStore.getItemAsync("access_token");
      }
      const savedUserStr = await AsyncStorage.getItem("userDetails");
      // console.log(savedToken);

      if (savedToken && savedUserStr) {
        try {
          const parsedUser = JSON.parse(savedUserStr);
          setauthToken(savedToken);
          setuserDetails(parsedUser);
          return true;
        } catch (e) {
          Alert.alert("No credential found! Please login again.");
          await AsyncStorage.removeItem("userDetails");
        }
      }

      await clearAuthState();
      return false;
    } catch (err) {
      console.log("Auth verify error:", err);
      await clearAuthState();
      return false;
    } finally {
      setloading(false);
    }
  };

  // function to sign out user
  const signOut = async () => {
    await clearAuthState();
  };

  //check auth state on app load(mount)
  useEffect(() => {
    verifyAuthTokenandUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userDetails,
        setuserDetails,
        authToken,
        setauthToken,
        verifyAuthTokenandUser,
        loading,
        setloading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
