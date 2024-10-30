import { useState } from "react";
import { Alert, View } from "react-native";
import { supabase } from "@utils/supabase";
import { Button, Input } from "@rneui/themed";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
          email: email,
          gender: "Male",
        },
      },
    });

    if (error) {
      console.log(error);
      Alert.alert(error.message);
    }
    if (!session) {
      Alert.alert("Please check your inbox for email verification!");
    }
    setLoading(false);
  }

  return (
    <View className="mt-10 p-3">
      <View className="my-5">
        <Input
          label="Name"
          leftIcon={{ type: "font-awesome", name: "user" }}
          onChangeText={(text) => setName(text)}
          value={name}
          placeholder="Name"
          autoCapitalize={"none"}
        />
      </View>
      <View className="my-5">
        <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View className="my-5">
        <Input
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>

      <View className="my-5">
        <Button
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View>
    </View>
  );
}
