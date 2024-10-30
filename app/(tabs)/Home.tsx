import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import useAuthStore from "@store/useAuthStore";

const Home = () => {
  const { authenticatedUser, isAuthenticated } = useAuthStore();
  const router = useRouter();

  if (!isAuthenticated) return router.replace("/");

  return (
    <View>
      <Text className="text-3xl">Home</Text>
      <View>
        <View>
          <Text>User ID: {authenticatedUser?.id}</Text>
          <Text>Email: {authenticatedUser?.email}</Text>
        </View>
      </View>
    </View>
  );
};

export default Home;
