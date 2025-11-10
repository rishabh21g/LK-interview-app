import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Interviews from "../../components/Interviews";
import { useAuth } from "../../context/AuthContext";
const Home = () => {
  const { signOut } = useAuth();
  return (
    <SafeAreaView className="flex-1 bg-dark py-2">
      <View className="px-6 items-end">
        <Pressable
          className="h-12 w-12 rounded-xl justify-center items-center bg-secondary mt-2"
          onPress={() => signOut()}
        >
          <AntDesign name="logout" size={24} color="#f49b33" />
        </Pressable>
      </View>
      <Interviews />
    </SafeAreaView>
  );
};

export default Home;
