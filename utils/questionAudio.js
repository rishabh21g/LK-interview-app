import axios from "axios";
import getAccessToken from "./getAccesstoken";
const QUESTION_URL = "https://interview.logicknots.com/voice/question-tts";

const questionAudioCall = async (interviewQuestions) => {
  const access_token = await getAccessToken();
  const response = await axios.get(QUESTION_URL, {
    params: interviewQuestions.questions[0].qid,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  console.log("TTS Response:", response);
};
export default questionAudioCall;
