import { Text, TouchableOpacity, View } from "react-native";

const ScheduledInterviewCard = ({ item, onJoin, onReschedule }) => {
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
           <View className="justify-between mt-4 w-full items-center gap-x-4 flex-1 flex-row">
        <TouchableOpacity
          className="border-primary border-2 px-6 py-3 rounded-full w-1/2 items-center  active:scale-95"
          onPress={() => onJoin(item.id)}
          activeOpacity={0.9}
        >
          <Text className="text-white font-bold text-base">Join</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="border-primary border-2 px-6 py-3 rounded-full w-1/2 items-center active:scale-95"
          onPress={() => onReschedule(item.id)}
          activeOpacity={0.9}
        >
          <Text className="text-white font-bold text-base">Reschedule</Text>
        </TouchableOpacity>
      </View>
      </View>
   
    </View>
  );
};

export default ScheduledInterviewCard;
