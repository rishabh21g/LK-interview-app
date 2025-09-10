import { SafeAreaView, Text, View } from "react-native";

export default function InterviewResultPage() {
  return (
    <SafeAreaView className="flex-1 bg-dark">
      <View className="flex-1 p-6">
        <Text className="text-white text-2xl font-bold mb-4">
          Interview Result
        </Text>

        {/* Add your interview result content here */}
        <View className="flex-1 bg-secondary rounded-lg p-4">
          <Text className="text-white text-lg font-semibold mb-2">
            Interview Results
          </Text>
          <Text className="text-gray-300">
            This is where you can display the interview results, scores,
            feedback, etc.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
//  PROFILE STATS |  NO OF INTERVIEWS MAX | DOWNLOAD RESULT |