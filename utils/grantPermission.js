import { AudioModule, setAudioModeAsync } from "expo-audio";
import { Alert } from "react-native";

export async function grantPermission() {
    const status = await AudioModule.requestRecordingPermissionsAsync();
    if (!status.granted) {
      Alert.alert("Permission to access microphone was denied");
    }

    await setAudioModeAsync({
      playsInSilentMode: true,
      allowsRecording: true,
    });
  }