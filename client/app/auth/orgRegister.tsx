import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { registerOrganization } from "../../services/organization";
import { useRouter } from "expo-router";

export default function OrgRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [timing, setTiming] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await registerOrganization(name, email, password, address, timing);
      Alert.alert("Success", "Organization registered!");
      router.push("/auth/OrgLogin" as any);
    } catch (err: any) {
      Alert.alert("Registration failed", err.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Organization Register
      </Text>
      <Text>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
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
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <Text>Address</Text>
      <TextInput
        value={address}
        onChangeText={setAddress}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <Text>Timing</Text>
      <TextInput
        value={timing}
        onChangeText={setTiming}
        style={{ borderWidth: 1, marginBottom: 20, padding: 10 }}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
