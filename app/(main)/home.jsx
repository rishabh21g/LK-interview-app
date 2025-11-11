import AntDesign from "@expo/vector-icons/AntDesign";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Interviews from "../../components/Interviews";
import { useAuth } from "../../context/AuthContext";
const Home = () => {
  const { signOut } = useAuth();
  return (
    <SafeAreaView className="flex-1 bg-dark ">
      <Interviews />
      <View className="flex item-end px">
        <TouchableOpacity
          className="h-12 w-12 rounded-xl justify-center items-center bg-secondary mt-2 flex-1 gap-2 p-3"
          onPress={() => signOut()}
        >
          <AntDesign name="logout" size={22} color="#f49b33" />
          <Text className="text-dark-icon text-xs">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
