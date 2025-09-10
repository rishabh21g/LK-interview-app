import { AudioModule, setAudioModeAsync } from "expo-audio";
import { Alert } from "react-native";

export async function grantPermission() {
    // Request audio permission
    const audioStatus = await AudioModule.requestRecordingPermissionsAsync();
    if (!audioStatus.granted) {
      Alert.alert("Permission to access microphone was denied");
    }

    await setAudioModeAsync({
      playsInSilentMode: true,
      allowsRecording: true,
    });
  }

