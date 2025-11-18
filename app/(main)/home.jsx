import { SafeAreaView } from "react-native-safe-area-context";
import Interviews from "../../components/Interviews";
const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-dark ">
      <Interviews />
    </SafeAreaView>
  );
};

export default Home;
