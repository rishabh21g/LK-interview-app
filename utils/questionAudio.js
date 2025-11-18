import axios from "axios";
import { router } from "expo-router";
import { Alert, Platform } from "react-native";
import getAccessToken from "./getAccesstoken";

const QUESTION_URL = "https://interview.logicknots.com/voice/question-tts";

const questionAudioCall = async (interviewQuestions) => {
  const access_token = await getAccessToken();
  const qid = interviewQuestions.questions[0].qid;
  const finalUrl = `${QUESTION_URL}?qid=${qid}`;

  // for web
  if (Platform.OS === "web") {
    try {
      const response = await axios.get(finalUrl, {
        headers: { Authorization: `Bearer ${access_token}` },
        responseType: "arraybuffer",
      });

      const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audio.play();

      return audioUrl;
    } catch (error) {
      router.push("/home");
      console.error(" Web audio fetch error:", error);
    }
  }

  // for mobile download audio first then play
  try {
    const response = await axios.get(finalUrl, {
      headers: { Authorization: `Bearer ${access_token}` },
      responseType: "arraybuffer",
    });

    // Convert to base64
    const base64Audio = btoa(
      new Uint8Array(response.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );

    const audioUri = `data:audio/mpeg;base64,${base64Audio}`;

    return audioUri;
  } catch (error) {
    Alert.alert("Error", "Error while communicating with interview database");
    console.error(" Mobile audio fetch error:", error);
    router.push("/home");
  }
};

export default questionAudioCall;
