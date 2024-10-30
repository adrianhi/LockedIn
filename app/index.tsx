import { Link } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import useAuthStore from "store/useAuthStore";

export default function Page() {
  const { setUserSession, initializeAuthListener } = useAuthStore();

  useEffect(() => {
    setUserSession();
    const unsubscribe = initializeAuthListener();

    return () => {
      unsubscribe();
    };
  }, [setUserSession, initializeAuthListener]);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View>
        <Text>Hello World</Text>
        <Text>This is the first page of your app.</Text>
        <Link href="/auth/Login" className="text-blue-600 underline">
          Ve a Login
        </Link>

        <Link href="/auth/Register" className="text-blue-600 underline">
          Ve a Register
        </Link>

        <Link href="/Home" className="text-blue-600 underline">
          Ve a Home
        </Link>
      </View>
    </View>
  );
}
