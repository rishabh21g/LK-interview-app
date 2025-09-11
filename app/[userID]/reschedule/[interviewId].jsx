import DateTimePicker from '@react-native-community/datetimepicker';
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useInterview } from "../../../context/InterviewContext";

const RescheduleInterview = () => {
  const { interviewId } = useLocalSearchParams();
  const { scheduledInterviews } = useInterview();  
  const [newDate, setNewDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [newTime, setNewTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [reason, setReason] = useState("");

  // Find the interview to reschedule
  const interview = scheduledInterviews.find(interview => interview.id === interviewId);

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setNewDate(selectedDate);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setNewTime(selectedTime);
    }
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const formatTime = (date) => {
    return date.toTimeString().slice(0, 5);
  };
 const confirmReschedule = async() => {
  //Logic to confirm reschedule in backend api call
  router.back();
 }
  const handleReschedule = () => {
    if (!newDate || !newTime) {
      Alert.alert("Error", "Please select a new date and time");
      return;
    }

    
    Alert.alert(
      "Reschedule Request Sent", 
      `Your reschedule request has been submitted for ${formatDate(newDate)} at ${formatTime(newTime)}. You will be notified once approved.`,
      [
        {
          text: "OK",
          onPress: confirmReschedule()
        }
      ]
    );
  };

  const handleCancel = () => {
    router.back();
  };

  if (!interview) {
    return (
      <SafeAreaView className="flex-1 bg-dark justify-center items-center">
        <Text className="text-white text-lg">Interview not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-dark">
      <View className="flex-1 px-6 py-8">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-white text-2xl font-bold mb-2">Reschedule Interview</Text>
          <Text className="text-gray-400 text-base">
            Current: {interview.date} at {interview.time}
          </Text>
        </View>

        {/* New Date Input */}
        <View className="mb-4">
          <Text className="text-white text-base font-semibold mb-2">New Date</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="bg-secondary p-4 rounded-lg"
          >
            <Text className="text-white">
              {formatDate(newDate)}
            </Text>
          </TouchableOpacity>
          
          {showDatePicker && (
            <DateTimePicker
              value={newDate}
              mode="date"
              display="default"
              onChange={onDateChange}
              minimumDate={new Date()}
              
            />
          )}
        </View>

        {/* New Time Input */}
        <View className="mb-4">
          <Text className="text-white text-base font-semibold mb-2">New Time</Text>
          <TouchableOpacity
            onPress={() => setShowTimePicker(true)}
            className="bg-secondary p-4 rounded-lg"
          >
            <Text className="text-white">
              {formatTime(newTime)}
            </Text>
          </TouchableOpacity>
          
          {showTimePicker && (
            <DateTimePicker
              value={newTime}
              mode="time"
              display="default"
              onChange={onTimeChange}
            />
          )}
        </View>

        {/* Reason Input */}
        <View className="mb-8">
          <Text className="text-white text-base font-semibold mb-2">Reason (Optional)</Text>
          <TextInput
            className="bg-secondary text-white p-4 rounded-lg h-24"
            placeholder="Enter reason for rescheduling..."
            placeholderTextColor="#9CA3AF"
            multiline
            textAlignVertical="top"
            value={reason}
            onChangeText={setReason}
          />
        </View>

        {/* Buttons */}
        <View className="flex-row gap-x-4">
          <TouchableOpacity
            onPress={handleCancel}
            className="flex-1 bg-gray-600 py-4 rounded-lg"
          >
            <Text className="text-white text-center font-semibold">Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={handleReschedule}
            className="flex-1 bg-primary py-4 rounded-lg"
          >
            <Text className="text-white text-center font-semibold">Submit Request</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RescheduleInterview;
