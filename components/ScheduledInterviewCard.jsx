import { Text, TouchableOpacity, View } from "react-native";

const ScheduledInterviewCard = ({ item, onJoin }) => {
  // console.log(item);
  return (
    <View className="bg-secondary rounded-3xl p-5 mb-4 flex-row justify-between items-center ">
      <View className="flex-1 pr-4">
        <Text className="text-dark text-lg font-bold mb-2 leading-6">
          {item.interview_name}
        </Text>
        <View className="space-y-1">
          <Text className="text-dark-icon text-sm">
            Date: {item.interview_date}
          </Text>
          <Text className="text-dark-icon text-sm">Time: {item.time}</Text>
          <Text className="text-dark-icon text-sm">
            Duration: {item.interview_time}
          </Text>
        </View>
        <View className="justify-center mt-4 w-full items-center gap-x-4 flex-1">
          <TouchableOpacity
            className="border-primary border-2 px-6 py-3 rounded-full w-full items-center  active:scale-95"
            onPress={() => onJoin(item.interview_name)}
            activeOpacity={0.9}
          >
            <Text className="text-white font-bold text-base">Join</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ScheduledInterviewCard;
