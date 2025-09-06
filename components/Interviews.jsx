import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useInterview } from "../context/InterviewContext";
import AppearedInterviewCard from "./AppearedInterviewCard";
import ScheduledInterviewCard from "./ScheduledInterviewCard";

const Interviews = () => {
  const [isScheduled, setisScheduled] = useState(true);
  const { appearedInterview, scheduledInterviews } = useInterview();

  const handleJoinInterview = async (interviewId) => {
   router.replace(`/${interviewId}`);
  };

  const handleViewInterview = (interviewId) => {
    router.replace(`/result/${interviewId}`);
  };

  return (
   <SafeAreaView className="flex-1 bg-dark">
  {/* Tabs */}
  <View className="flex-row justify-center mb-6 space-x-4 px-6 mt-8">
    {/* Appeared Tab */}
    <TouchableOpacity
      onPress={() => setisScheduled(false)}
      className={`flex-1 py-3 rounded-xl items-center ${
        !isScheduled ? "bg-primary" : "bg-secondary"
      }`}
    >
      <Text
        className={`text-base font-semibold ${
          !isScheduled ? "text-white" : "text-dark-icon"
        }`}
      >
        Appeared
      </Text>
    </TouchableOpacity>

    {/* Scheduled Tab */}
    <TouchableOpacity
      onPress={() => setisScheduled(true)}
      className={`flex-1 py-3 rounded-xl items-center ${
        isScheduled ? "bg-primary" : "bg-secondary"
      }`}
    >
      <Text
        className={`text-base font-semibold ${
          isScheduled ? "text-white" : "text-dark-icon"
        }`}
      >
        Scheduled
      </Text>
    </TouchableOpacity>
  </View>

  {/* List */}
  <View className="flex-1 px-6">
    {isScheduled ? (
      <FlatList
        data={scheduledInterviews}
        renderItem={({ item }) => (
          <ScheduledInterviewCard
            item={item}
            onJoin={handleJoinInterview}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120, flexGrow: 1 }}
      />
    ) : (
      <FlatList
        data={appearedInterview}
        renderItem={({ item }) => (
          <AppearedInterviewCard
            item={item}
            onPress={handleViewInterview}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120, flexGrow: 1 }}
      />
    )}
  </View>
</SafeAreaView>

  );
};

export default Interviews;
