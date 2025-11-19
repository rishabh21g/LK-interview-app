import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { FlatList, Platform, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import { useInterview } from "../context/InterviewContext";
import AppearedInterviewCard from "./AppearedInterviewCard";
import ScheduledInterviewCard from "./ScheduledInterviewCard";
import FontAwesome from "@expo/vector-icons/FontAwesome";
const Interviews = () => {
  const [isScheduled, setisScheduled] = useState(true);
  const {
    appearedInterview,
    scheduledInterviews,
    setInterviewQuestions,
    setScheduledInterviews,
  } = useInterview();
  const [joiningLoading, setJoiningLoading] = useState(false);
  const { userDetails } = useAuth();

  // function to handle join interview
  const handleJoinInterview = async (interview_name) => {
    setJoiningLoading(true);
    try {
      let access_token = "";
      // Retrieve token securely
      if (Platform.OS === "web") {
        access_token = await AsyncStorage.getItem("access_token");
      } else {
        access_token = await SecureStore.getItemAsync("access_token");
      }
      // console.log(access_token);
      const joinData = {
        interview_name: interview_name,
      };
      const joinResult = await axios.post(
        "https://interview.logicknots.com/interview/start",
        JSON.stringify(joinData),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      console.log(joinResult);
      setInterviewQuestions(joinResult.data);
      // console.log("Join interview response:", joinResult.data);
      router.push(`/${interview_name}`);
    } catch (err) {
      console.log("Error joining interview:", err);
    } finally {
      setJoiningLoading(false);
    }
  };

  const handleViewInterview = (interview_name) => {
    router.push(`/${userDetails.candidateId}/result/${interview_name}`);
  };

  async function loadUserInterviewsFromLS() {
    const storedInterviews = await AsyncStorage.getItem("scheduledInterviews");
    setScheduledInterviews(JSON.parse(storedInterviews) || []);
  }

  // load from local storage on component mount
  useEffect(() => {
    loadUserInterviewsFromLS();
  }, []);

  //if user joining the interview show loading screen
  if (joiningLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-dark">
        <Text className="text-white text-lg text-center font-medium ">
          Joining Interview...
        </Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className="flex-1 bg-dark">
      {/* Tabs */}
      <View className="flex-row justify-center mb-6 gap-x-4 px-6 ">
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
            keyExtractor={(item) => item.interview_name}
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

      <TouchableOpacity
        className="absolute bottom-6 right-6 h-16 w-16 rounded-xl justify-center items-center bg-secondary p-3 z-10"
        onPress={() => {
          router.replace({
            pathname: "/[candidateID]",
            params: { candidateID: userDetails?.candidateId },
          });
        }}
      >
        <FontAwesome name="user" size={22} color="#f49b33" />
        <Text className="text-dark-icon text-xs">Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Interviews;
