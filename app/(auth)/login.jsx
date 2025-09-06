import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import uuid from "react-native-uuid";
import { useAuth } from "../../context/AuthContext";

import { validateInputsLog } from "../../utils/inputChecker";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setauthToken, setuserDetails } = useAuth();


  // handle login dummy code 
  const handleLogin = async () => {
    setloading(true);
    // const user = { email, password };
    try {
      // const response = await axios.post(
      //   "http://192.168.117.43:4000/api/user/login",
      //   user
      // );

      // const token = response.data.token;
      // const userDetails = {
      //   name: response.data.userName,
      //   email: response.data.email,
      //   userID: response.data.userID,
      // };
      const token = "hfiudshfuidhfuieh2734877";
      const userDetails = {
        email: email,
        password: password,
        userID: uuid.v4(),
      };

      if (token) {
        //Update Local Storage
        await AsyncStorage.setItem("authToken", token);
        await AsyncStorage.setItem("userDetails", JSON.stringify(userDetails));
        // Update context (AuthProvider)
        setauthToken(token);
        setuserDetails(userDetails);
        Alert.alert("Login Successfully");
        router.replace("/home");
        
      }
      setemail("");
      setpassword("");
    } catch (err) {
      Alert.alert("Login failed");
      console.log("Error while loggin in " + err.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 px-6 justify-center bg-dark">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={50}
        className="flex-1 justify-center"
      >
        {/* Logo */}
        <View className="items-center mb-10">
          <Text className="mt-5 text-2xl font-semibold text-dark">
            Login to your account
          </Text>
        </View>

        {/* Email Input */}
        <View className="flex-row items-center rounded-xl px-3 mb-5 h-12 shadow-primary bg-secondary">
          <MaterialIcons name="email" size={22} color="#f49b33" />
          <TextInput
            placeholder="Enter your email"
            onChangeText={(text) => setemail(text.trim())}
            value={email}
            keyboardType="email-address"
            className="flex-1 ml-2 text-sm text-dark placeholder-dark-icon"
            placeholderTextColor="#9BA1A6"
          />
        </View>

        {/* Password Input */}
        <View className="flex-row items-center rounded-xl px-3 mb-3 h-12 shadow-primary bg-secondary">
          <MaterialIcons name="lock" size={22} color="#f49b33" />
          <TextInput
            secureTextEntry={!showPassword}
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => setpassword(text)}
            className="flex-1 ml-2 text-sm text-dark placeholder-dark-icon"
            placeholderTextColor="#9BA1A6"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialIcons
              name={!showPassword ? "visibility-off" : "visibility"}
              size={22}
              color="#f49b33"
            />
          </TouchableOpacity>
        </View>

        {/* Forget / Keep me Logged in */}
        <View className="flex-row justify-between mb-8 px-1">
          <Text className="text-[12px] italic text-dark-icon">
            Keep me logged in
          </Text>
        </View>

        {/* Login Button */}
        <Pressable
          disabled={loading}
          className="h-12 rounded-xl justify-center items-center bg-primary"
          onPress={() => {
            const checkResult = validateInputsLog(email, password);
            if (checkResult) handleLogin();
          }}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-base font-semibold text-white">Login</Text>
          )}
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
