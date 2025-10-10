import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { router, useLocalSearchParams } from "expo-router";

function VerifyEmail() {
  const { email } = useLocalSearchParams();
  const [code, setCode] = useState("");

  const verify = async () => {
    if (!email) {
      Toast.show({
        type: "error",
        text1: "Email not found, please register again",
      });
      return;
    }
    if (!code) {
      Toast.show({ type: "error", text1: "Enter verification code" });
      return;
    }

    try {
      const response = await fetch(
        `http://192.168.100.102:5000/api/auth/verifyEmail`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code }),
        }
      );

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        Toast.show({ type: "success", text1: "Email verified successfully" });
        // router.replace("/auth");
      } else {
        Toast.show({
          type: "error",
          text1: result.message || "Verification failed",
        });
      }
    } catch (err) {
      console.error("Verification error:", err);
      Toast.show({ type: "error", text1: "Server error" });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <TextInput
        placeholder="Verification Code"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          borderRadius: 8,
          width: "80%",
          marginBottom: 20,
        }}
      />
      <TouchableOpacity
        onPress={verify}
        style={{ backgroundColor: "#6366f1", padding: 12, borderRadius: 8 }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

export default VerifyEmail;
