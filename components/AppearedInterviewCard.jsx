import { Text, TouchableOpacity, View } from "react-native";

const AppearedInterviewCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      className="bg-secondary rounded-3xl p-5 mb-4 flex-row justify-between items-center shadow-primary"
      onPress={() => onPress(item.id)}
      activeOpacity={0.85}
    >
      <View className="flex-1 pr-4">
        <Text className="text-dark text-lg font-bold mb-2 leading-6">
          {item.interviewName}
        </Text>
        <Text className="text-dark-icon text-base mb-3 font-medium">
          {item.candidateName}
        </Text>
        <View className="space-y-1">
          <Text className="text-dark-icon text-sm">Date: {item.date}</Text>
          <Text className="text-dark-icon text-sm">
            Duration: {item.duration}
          </Text>
        </View>
      </View>
      <View className="items-center">
        <View className="bg-primary/20 px-3 py-1.5 rounded-full">
          <Text className="text-primary text-sm font-semibold">Completed</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AppearedInterviewCard;
