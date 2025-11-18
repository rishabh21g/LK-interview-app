import { router } from "expo-router";
import { Alert } from "react-native";

export const useInterviewRecording = ({
  isRecording,
  setisRecording,
  setisVideoRecording,
  audioRecorder,
  segments,
  setSegments,
  videoPermission,
  requestVideoPermission,
  finishInterview,
}) => {
  // Start audio recording
  const startAudioRecording = async () => {
    try {
      await audioRecorder.prepareToRecordAsync();
      await audioRecorder.record();
      console.log("Recording started...");
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  };

  // Stop audio recording
  const stopAudioRecording = async () => {
    try {
      await audioRecorder.stop();
      const uri = audioRecorder.uri;
      console.log("Recording saved at:", uri);
      setSegments((prev) => [...prev, uri]);
    } catch (error) {
      console.error("Failed to stop recording:", error);
    }
  };

  // Handle audio recording toggle
  const handleRecording = () => {
    if (!isRecording) {
      startAudioRecording();
    } else {
      stopAudioRecording();
    }
    setisRecording((prev) => !prev);
  };

  // Handle video recording toggle
  const handleVideoRecording = async () => {
    if (!videoPermission?.granted) {
      const permission = await requestVideoPermission();
      if (!permission.granted) {
        Alert.alert(
          "Camera Permission",
          "Camera permission is required to record video."
        );
        return;
      }
    }
    setisVideoRecording((prev) => !prev);
  };

  // Disconnect interview
  const disconnectInterview = async () => {
    if (isRecording) await stopAudioRecording();
    setisVideoRecording(false);
    setisRecording(false);
    await finishInterview(segments, setSegments);
    router.push("/(main)/home");
  };

  // Handle disconnect with confirmation
  const handleDisconnect = () => {
    Alert.alert(
      "Disconnect Interview",
      "Are you sure you want to disconnect the interview?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Disconnect",
          style: "destructive",
          onPress: () => disconnectInterview(),
        },
      ],
      { cancelable: true }
    );
  };

  return {
    handleRecording,
    handleVideoRecording,
    handleDisconnect,
  };
};
