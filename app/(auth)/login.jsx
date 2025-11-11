import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
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
import { useAuth } from "../../context/AuthContext";
import { useInterview } from "../../context/InterviewContext";
import { setAccessToken } from "../../utils/getAccesstoken";

const Login = () => {
  const [candidateId, setCandidateId] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setauthToken, setuserDetails } = useAuth();
  const { setScheduledInterviews } = useInterview();
  const URL = "https://interview.logicknots.com/auth/can/login";

  // handle login dummy code
  const handleLogin = async () => {
    setloading(true);
    try {
      if (candidateId.length === 0 || password.length === 0) {
        Alert.alert("Error", "Please fill all the fields");
        return;
      }
      const { data } = await axios.post(URL, { candidateId, password });
      const userDetails = {
        name: data?.candidate.name,
        email: data?.candidate.email,
        candidateId: data?.candidate.candidateId,
        phone: data?.candidate.phone,
      };
      // Store sensitive token securely
      await setAccessToken(data?.access_token);

      // Non-sensitive profile can stay in AsyncStorage
      await AsyncStorage.setItem("userDetails", JSON.stringify(userDetails));
      await AsyncStorage.setItem(
        "scheduledInterviews",
        JSON.stringify(data.candidate.interviews)
      );
      setauthToken(data.access_token);
      setuserDetails(userDetails);
      setScheduledInterviews(data.candidate.interviews);
      console.log(data);
      Alert.alert("Login Successfully");
      router.replace("/home");
    } catch (err) {
      Alert.alert("Login failed");
      console.log("Error while loggin in " + err.message);
    } finally {
      setloading(false);
      setCandidateId("");
      setpassword("");
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
        <View className="flex-row items-center rounded-xl px-3 mb-5 h-12  bg-secondary">
          <FontAwesome name="user" size={22} color="#f49b33" />
          <TextInput
            placeholder="Enter your Candidate Id"
            onChangeText={(text) => setCandidateId(text.trim())}
            value={candidateId}
            className="flex-1 ml-2 text-sm text-dark placeholder-dark-icon"
            placeholderTextColor="#9BA1A6"
          />
        </View>

        {/* Password Input */}
        <View className="flex-row items-center rounded-xl px-3 mb-3 h-12  bg-secondary">
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

        {/* Login Button */}
        <Pressable
          disabled={loading}
          className="h-12 rounded-xl justify-center items-center bg-primary mt-2"
          onPress={handleLogin}
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
