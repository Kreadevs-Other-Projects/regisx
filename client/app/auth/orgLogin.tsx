import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { loginOrganization } from "../../services/organization";
import { useRouter } from "expo-router";

export default function OrgLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const data = await loginOrganization(email, password);
      Alert.alert("Success", "Organization logged in!");
      router.push("/home");
    } catch (err: any) {
      Alert.alert("Login failed", err.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Organization Login</Text>
      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 20, padding: 10 }}
      />
      <Button title="Login" onPress={handleLogin} />
      <View style={{ height: 10 }} />
      <Button
        title="Register"
        onPress={() => router.push("/auth/OrgRegister" as any)}
      />
    </View>
  );
}
