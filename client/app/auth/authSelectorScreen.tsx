import React from "react";
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function AuthSelectorScreen() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 22, marginBottom: 20, fontWeight: "600" }}>
        Choose Login Type
      </Text>

      <Button
        title="User Login"
        onPress={() => router.push("/auth/userLogin" as any)}
      />

      <View style={{ height: 10 }} />

      <Button
        title="Organization Login"
        onPress={() => router.push("/auth/orgLogin" as any)}
      />
    </View>
  );
}
