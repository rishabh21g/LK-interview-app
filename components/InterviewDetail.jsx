import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { RecordingPresets, useAudioRecorder } from "expo-audio";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useTimer from "../hooks/useTimer";
import finishInterview from "../utils/finishedInterview";
import { grantPermission } from "../utils/grantPermission";

const InterviewDetail = () => {
  const [isRecording, setisRecording] = useState(false);
  const [isVideoRecording, setisVideoRecording] = useState(false);
  const [segments, setSegments] = useState([]); // for audio segements compilatiopn array
  const [facing] = useState("front");
  const [videoPermission, requestVideoPermission] = useCameraPermissions();
  const { userDetail } = useAuth();
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  // finished interview function
  const handleFinishInterview = useCallback(() => {
    finishInterview(segments, setSegments);
  }, [segments]);
  const { min, sec } = useTimer(30, handleFinishInterview);

  // handle audio recording
  const handleRecording = () => {
    if (!isRecording) {
      startAudioRecording();
    } else {
      stopAudioRecording();
    }
    setisRecording((prev) => !prev);
  };
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
  // for start audio recording
  async function startAudioRecording() {
    try {
      await audioRecorder.prepareToRecordAsync();
      await audioRecorder.record();
      console.log("Recording started...");
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  }

  //for stop audio recording
  async function stopAudioRecording() {
    try {
      await audioRecorder.stop();
      const uri = audioRecorder.uri;
      console.log("Recording saved at:", uri);
      setSegments((prev) => [...prev, uri]);
    } catch (error) {
      console.error("Failed to stop recording:", error);
    }
  }
  const disconnectInterview = () => {
    if (isRecording) stopAudioRecording();
    setisVideoRecording(false);
    setisRecording(false);
    finishInterview(segments, setSegments);
    router.push("/");

  };
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
          text: "Restart",
          style: "destructive",
          onPress: () => {
            disconnectInterview();
          },
        },
      ],
      { cancelable: true }
    );
  };
  // calling first time on render to take mic and camera input permission
  useEffect(() => {
    grantPermission();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-dark py-2">
      <View className="flex-1 px-5 gap-y-5">
        <Text className="text-dark text-4xl font-bold text-center  mt-20">
          Interview Name
        </Text>

        <View className="items-center  mt-8">
          <View className="w-60 h-60 rounded-full overflow-hidden border-4 border-primary">
            {videoPermission?.granted && isVideoRecording ? (
              <CameraView
                facing={facing}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <View className="w-full h-full rounded-full bg-gray-800 justify-center items-center">
                <Ionicons name="person" size={60} color="#f49b33" />
              </View>
            )}
          </View>
        </View>
          <View>
            <Text className="text-dark text-5xl font-bold text-center mt-4">
              {min}:{sec}
            </Text>
          </View>

        <View className="items-center ">
          <Text className="text-dark text-2xl font-light mb-2 ">
            {userDetail?.name || "Candidate Name"}
          </Text>

          <View className="flex-row justify-center items-center gap-x-8 mt-3">
            <TouchableOpacity
              className="w-16 h-16 rounded-full border-4 border-primary  justify-center items-center hover:cursor-pointer"
              onPress={handleRecording}
            >
              {isRecording ? (
                <Feather name="mic" size={24} color="#f49b33" />
              ) : (
                <Feather name="mic-off" size={24} color="#f49b33" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className="w-16 h-16 rounded-full border-4 border-primary  justify-center items-center"
              onPress={handleVideoRecording}
            >
              {isVideoRecording ? (
                <Feather name="camera" size={24} color="#f49b33" />
              ) : (
                <Feather name="camera-off" size={24} color="#f49b33" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className="w-16 h-16 rounded-full border-4 border-primary  justify-center items-center"
              onPress={handleDisconnect}
            >
             <MaterialIcons name="call-end" size={24} color="#f49b33" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    
    </SafeAreaView>
  );
};

export default InterviewDetail;
