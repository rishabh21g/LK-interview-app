import { Alert } from "react-native";


 export const validateInputsLog = ( email, password) => {
    // Empty check
    if ( !email || !password) {
      Alert.alert("All fields are required");
      return false;
    }

    // Email check (basic regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Enter a valid email address");
      return false;
    }

    // Password check (min 6 char, at least 1 number)
    if (password.length < 6 || !/\d/.test(password)) {
      Alert.alert(
        "Password must be at least 6 characters and contain a number"
      );
      return false;
    }

    return true;
  };