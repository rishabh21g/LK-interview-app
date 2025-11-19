import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { RecordingPresets, useAudioPlayer, useAudioRecorder } from "expo-audio";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import {
  Platform,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useInterview } from "../context/InterviewContext";
import { useInterviewRecording } from "../hooks/useInterviewRecording";
import { usePermissionCheck } from "../hooks/usePermissionCheck";
import useTimer from "../hooks/useTimer";
import { finishInterview } from "../utils/finishInterview";
import { grantPermission } from "../utils/grantPermission";
import questionAudioCall from "../utils/questionAudio";
import { submitAnswer } from "../utils/submitAnswer";

const InterviewDetail = () => {
  const { interviewQuestions } = useInterview();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isRecording, setisRecording] = useState(false);
  const [isVideoRecording, setisVideoRecording] = useState(false);
  const [segments, setSegments] = useState([]);
  const navigation = useNavigation();
  const [facing] = useState("front");
  const [videoPermission, requestVideoPermission] = useCameraPermissions();
  const { userDetails } = useAuth();
  const audioPlayer = useAudioPlayer();
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const session_id = interviewQuestions?.session_id;
  let currentQuestion = interviewQuestions?.questions[questionIndex];
  const {
    handleRecording,
    handleVideoRecording,
    handleDisconnect,
    stopAudioRecording,
  } = useInterviewRecording({
    isRecording,
    setisRecording,
    setisVideoRecording,
    audioRecorder,
    segments,
    setSegments,
    videoPermission,
    requestVideoPermission,
    finishInterview,
  });

  const { min, sec } = useTimer(interviewQuestions?.time, () =>
    finishInterview(segments, setSegments),
  );

  // Use permission check hook
  usePermissionCheck(audioRecorder, videoPermission, requestVideoPermission);

  //handle submit answer
  const handleSubmitAnswer = async () => {
    try {
      // Ensure we have a finalized segment for this answer
      let lastUri = segments[segments.length - 1];
      if (isRecording) {
        const stoppedUri = await stopAudioRecording();
        if (stoppedUri) lastUri = stoppedUri;
      }

      if (!lastUri) {
        if (Platform.OS !== "web") {
          ToastAndroid.show(
            "Please record your answer before submitting",
            ToastAndroid.SHORT,
          );
        }
        return;
      }

      const qid = currentQuestion?.qid;
      const status = await submitAnswer({
        audioSegmentUri: lastUri,
        session_id,
        qid,
      });
      console.log(status);
    } catch (err) {
      console.log("Error while submitting answer", err?.message);
    } finally {
      const total = interviewQuestions?.questions?.length || 0;
      const isLast = questionIndex >= total - 1;

      if (isLast) {
        await finishInterview(segments, setSegments);
      } else {
        setQuestionIndex((idx) => idx + 1);
      }
    }
  };

  const initializeInterview = async () => {
    await grantPermission();

    if (Platform.OS !== "web") {
      ToastAndroid.show("Interview Started", ToastAndroid.SHORT);
      ToastAndroid.show(
        "Kindly turn on your mic and camera",
        ToastAndroid.LONG,
      );
    }
  };

  //Initialize Interview on mount
  useEffect(() => {
    initializeInterview();
  }, []);

  // Play TTS for the current question ID
  useEffect(() => {
    const playQuestionTTS = async () => {
      if (!currentQuestion?.qid) return;
      try {
        const audioUri = await questionAudioCall(currentQuestion.qid);
        if (Platform.OS !== "web" && audioUri) {
          audioPlayer.replace(audioUri);
          audioPlayer.play();
        }
      } catch (error) {
        console.error("Failed to play question audio:", error);
      }
    };
    playQuestionTTS();
  }, [currentQuestion?.qid]);

  // Disable back button
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      handleDisconnect();
    });
    return unsubscribe;
  }, [navigation, handleDisconnect]);

  return (
    <SafeAreaView className="flex-1 bg-dark py-2">
      <View className="flex-1 px-5 gap-y-5">
        <Text className="text-dark text-4xl font-bold text-center mt-20">
          {interviewQuestions.interview_name || "Interview Name"}
        </Text>

        <View className="items-center mt-8">
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

        <View className="items-center">
          <Text className="text-dark text-2xl font-light mb-2">
            {userDetails?.name || "Candidate Name"}
          </Text>

          <View className="flex-row justify-center items-center gap-x-8 mt-3">
            <TouchableOpacity
              className="w-16 h-16 rounded-full border-4 border-primary justify-center items-center"
              onPress={handleRecording}
            >
              {isRecording ? (
                <Feather name="mic" size={24} color="#f49b33" />
              ) : (
                <Feather name="mic-off" size={24} color="#f49b33" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className="w-16 h-16 rounded-full border-4 border-primary justify-center items-center"
              onPress={handleVideoRecording}
            >
              {isVideoRecording ? (
                <Feather name="camera" size={24} color="#f49b33" />
              ) : (
                <Feather name="camera-off" size={24} color="#f49b33" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className="w-16 h-16 rounded-full border-4 border-primary justify-center items-center"
              onPress={handleDisconnect}
            >
              <Feather name="phone-off" size={24} color="#f49b33" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Submit Answer Button */}
        <View className="w-full items-center mt-5">
          <TouchableOpacity
            onPress={handleSubmitAnswer}
            className="flex-row items-center justify-center bg-light-tint px-8 py-3 rounded-full"
          >
            <Feather name="check" size={20} color="#fff" />
            <Text className="text-dark-tint text-lg font-semibold ml-2">
              Submit Answer
            </Text>
          </TouchableOpacity>
        </View>

        {/* Question Image */}
        {currentQuestion?.image_url !== null && (
          <View className="w-full items-center mt-4 mb-4">
            <Image
              source={{ uri: currentQuestion?.image_url }}
              className="w-full h-48 rounded-lg"
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default InterviewDetail;
