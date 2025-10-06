import React, { useState } from "react";
import { url } from "../url";
import { View, Text, TextInput, Button, Alert } from "react-native";

export default function UserRegister() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      const res = await fetch(`${url}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert("Success", "User registered successfully");
        console.log("User:", data.user);
      } else {
        Alert.alert("Error", data.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Register error:", err);
      Alert.alert("Error", "Failed to connect to server");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "600", marginBottom: 20 }}>
        User Register
      </Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 10,
          marginBottom: 20,
        }}
      />

      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
