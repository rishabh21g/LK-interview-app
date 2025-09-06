import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { RecordingPresets, useAudioRecorder } from "expo-audio";
import { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useTimer from "../hooks/useTimer";
import finishInterview from "../utils/finishedInterview";
import { grantPermission } from "../utils/grantPermission";

const InterviewDetail = () => {
  const [isRecording, setisRecording] = useState(false);
  const [isVideoRecording, setisVideoRecording] = useState(false);
  const [segments, setSegments] = useState([]);
  const { userDetail } = useAuth();
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  // finished interview function
  const handleFinishInterview = useCallback(() => {
    finishInterview(segments, setSegments);
  }, [segments]);
  const { min, sec } = useTimer(1, handleFinishInterview);

  // handle audio recording
  const handleRecording = () => {
    if (!isRecording) {
      startAudioRecording();
    } else {
      stopAudioRecording();
    }
    setisRecording((prev) => !prev);
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

  // calling first time on render to take mic input permission
  useEffect(() => {
    grantPermission();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-dark">
      <View className="flex-1 px-5">
        <Text className="text-dark text-4xl font-bold text-center mb-4 mt-20">
          Interview Name
        </Text>

        <View className="items-center mb-10 mt-8">
          <View className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary">
            {/* Image here  */}
          </View>
          <Text className="text-dark text-5xl font-bold text-center mt-5">
            {min}:{sec}
          </Text>
        </View>

        <View className="items-center mb-12">
          <Text className="text-dark text-2xl font-light mb-8">
            {userDetail?.name || "Candidate Name"}
          </Text>

          <View className="flex-row justify-center items-center gap-6">
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
              onPress={() => {
                setisVideoRecording((prev) => !prev);
              }}
            >
              {isVideoRecording ? (
                <Feather name="camera" size={24} color="#f49b33" />
              ) : (
                <Feather name="camera-off" size={24} color="#f49b33" />
              )}
            </TouchableOpacity>

            <TouchableOpacity className="w-16 h-16 rounded-full border-4 border-primary  justify-center items-center">
              <Ionicons name="refresh" size={24} color="#f49b33" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className=" items-center mb-24 mt-5">
        <TouchableOpacity className="w-16 h-16 rounded-full bg-dark-tint justify-center items-center">
          <Ionicons name="person" size={28} color="#f49b33" />
        </TouchableOpacity>
        {/* <TouchableOpacity
          className="w-16 h-16 rounded-full bg-dark-tint justify-center items-center"
          onPress={finishInterview}
        >
          <Ionicons name="download" size={28} color="#f49b33" />
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default InterviewDetail;
