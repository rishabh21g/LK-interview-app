import axios from "axios";
import { Platform, ToastAndroid } from "react-native";
import getAccessToken from "./getAccesstoken";

const ANSWER_URL = "https://interview.logicknots.com/voice/answer-stt";

export async function submitAnswer({ audioSegementURI, session_id, qid }) {
  try {
    const access_token = await getAccessToken();
    const formData = new FormData();

    formData.append("session_id", session_id);
    formData.append("qid", qid);

    if (Platform.OS === "web") {
      // convert URI blob
      const res = await fetch(audioSegementURI);
      const blob = await res.blob();

      formData.append("audio", blob, "answer.mp3");
    } else {
      // mobile
      formData.append("audio", {
        uri: audioSegementURI,
        name: "answer.mp3",
        type: "audio/mp3",
      });
    }

    const response = await axios.post(ANSWER_URL, formData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (Platform.OS !== "web") {
      ToastAndroid.show("Answer submitted", ToastAndroid.SHORT);
    }

    return response.data;
  } catch (error) {
    console.error("Error uploading answer:", error.response?.data || error);
    throw error;
  }
}

/*

{
  "interview_name": "aaaaaaa",
  "passing_marks": 50,
  "time": 30,
  "session_id": "691300ec886dc72cdfe25f62",
  "questions": [
    {
      "qid": "68851023d84b387935b1bd5f",
      "qno": 5,
      "question": "What is the principle of a lever?",
      "difficulty": "easy",
      "image_url": null
    },
    {
      "qid": "68851023d84b387935b1bd5c",
      "qno": 2,
      "question": "Define the term ‘work’ in physics.",
      "difficulty": "easy",
      "image_url": "/static/images/q2.png"
    },
    {
      "qid": "68851023d84b387935b1bd5d",
      "qno": 3,
      "question": "What is the difference between scalar and vector quantities?",
      "difficulty": "medium",
      "image_url": null
    },
    {
      "qid": "68851023d84b387935b1bd64",
      "qno": 10,
      "question": "Explain the concept of relative velocity.",
      "difficulty": "medium",
      "image_url": null
    },
    {
      "qid": "68851023d84b387935b1bd62",
      "qno": 8,
      "question": "Describe the photoelectric effect.",
      "difficulty": "hard",
      "image_url": null
    }
  ]
}

*/

/*
curl -X POST https://interview.logicknots.com/voice/answer-stt \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -F "session_id=SESSION_ID" \
  -F "qid=QUESTION_OBJECT_ID" \
  -F "audio=@answer.mp3"
*/

// 'STT unavailable: set OPENAI_API_KEY for Whisper'
