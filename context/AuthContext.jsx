import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
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

  const clearAuthState = async () => {
    try {
      await SecureStore.deleteItemAsync("access_token");
      await AsyncStorage.removeItem("userDetails");
    } catch {}
    setauthToken(null);
    setuserDetails({ name: null, email: null, candidateId: null, phone: null });
  };

  const verifyAuthTokenandUser = async () => {
    setloading(true);
    try {
      const savedToken = await SecureStore.getItemAsync("access_token");
      const savedUserStr = await AsyncStorage.getItem("userDetails");

      if (savedToken && savedUserStr) {
        try {
          const parsedUser = JSON.parse(savedUserStr);
          setauthToken(savedToken);
          setuserDetails(parsedUser);
          return true;
        } catch (e) {
          Alert.alert(
            "Corrupted userDetails in storage; clearing.",
            e?.message
          );
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

  const signOut = async () => {
    await clearAuthState();
  };

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
