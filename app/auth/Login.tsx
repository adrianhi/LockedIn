import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { useRouter } from "expo-router";
import { signInWithPassword } from "@services/auth/authService";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function signInWithEmail() {
    setLoading(true);
    const { data, error } = await signInWithPassword({
      email: "test@gmail.com", //Change before push it
      password: "test1234567",
    });

    if (!error) {
      Alert.alert("Login Successful!", `Welcome back, ${data.user?.email}`);
      router.replace("/Home");
    } else {
      Alert.alert(error.message);
    }
    setLoading(false);
  }

  return (
    <View>
      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />

      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry={true}
      />

      <Button disabled={loading} title="Login" onPress={signInWithEmail} />
    </View>
  );
};

export default LoginScreen;
