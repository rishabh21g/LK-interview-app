import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native";

import InterviewDetail from "../../components/InterviewDetail";

export default function InterviewPage() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 ">
     
      <InterviewDetail/>
    </SafeAreaView>
  );
}
