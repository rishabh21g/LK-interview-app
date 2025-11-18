import axios from "axios";
import { Platform, ToastAndroid } from "react-native";
import getAccessToken from "./getAccesstoken";
const ANSWER_URL = "https://interview.logicknots.com/voice/answer-stt";

export async function submitAnswer({ audioSegement, session_id, qid }) {
  try {
    const access_token = await getAccessToken();
    const formData = new FormData();

    formData.append("session_id", session_id);
    formData.append("qid", qid);
    formData.append("audio", audioSegement);
    const response = await axios.post(ANSWER_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (Platform.OS !== "web") {
      ToastAndroid.show("Answer submitted", ToastAndroid.SHORT);
    }
    console.log("Answer submitted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading answer:", error.response?.data || error);
    throw error;
  }
}
// Calling in react native
/*
submitAnswer({
  audioSegement: {
    uri: recordingFileUri,
    type: "audio/mpeg",
    name: "answer.mp3",
  },
  session_id,
  qid,
});
*/

/*
From WEB 
submitAnswer({
  audioSegement: new File([audioBlob], "answer.mp3", { type: "audio/mpeg" }),
  session_id: "...",
  qid: "...",
});
*/
