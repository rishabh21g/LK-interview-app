import { Text, TouchableOpacity, View } from "react-native";

const ScheduledInterviewCard = ({ item, onJoin }) => {
  return (
    <View className="bg-secondary rounded-3xl p-5 mb-4 flex-row justify-between items-center shadow-primary">
      <View className="flex-1 pr-4">
        <Text className="text-dark text-lg font-bold mb-2 leading-6">
          {item.interviewName}
        </Text>
        <Text className="text-dark-icon text-base mb-3 font-medium">
          {item.candidateName}
        </Text>
        <View className="space-y-1">
          <Text className="text-dark-icon text-sm">Date: {item.date}</Text>
          <Text className="text-dark-icon text-sm">Time: {item.time}</Text>
          <Text className="text-dark-icon text-sm">
            Duration: {item.duration}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        className="bg-primary px-6 py-3 rounded-full shadow-primary active:scale-95"
        onPress={() => onJoin(item.id)}
        activeOpacity={0.9}
      >
        <Text className="text-white font-bold text-base">Join</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScheduledInterviewCard;
