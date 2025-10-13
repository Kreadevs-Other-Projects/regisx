import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { colors } from "@/constants/style";

interface UserForm {
  name: string;
  email: string;
  password: string;
}

const RegisterUser: React.FC = () => {
  const [form, setForm] = useState<UserForm>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof UserForm, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    const { name, email, password } = form;

    if (!name || !email || !password) {
      Alert.alert(
        "Missing Fields",
        "Please fill all fields and upload a logo."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://192.168.100.60:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        Toast.show({
          type: "success",
          text1: result.message || "Logged in successfully",
        });

        router.push("/auth/UserAuth/LoginUser");
      } else {
        Toast.show({
          type: "error",
          text1: result.message,
        });
      }
    } catch (error: any) {
      console.log(
        "❌ Registration error:",
        error.response?.data || error.message
      );
      Alert.alert(
        "Error",
        error.response?.data?.error || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Register</Text>
      {/* <Text style={styles.subText}>Create User account</Text> */}

      <TextInput
        style={styles.input}
        placeholder="your name"
        value={form.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={form.password}
        onChangeText={(text) => handleChange("password", text)}
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        disabled={loading}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>{loading ? "Login..." : "Login"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.neutral200 }]}
        onPress={() => router.navigate("/auth/UserAuth/LoginUser")}
      >
        <Text style={[styles.buttonText, { color: colors.neutral500 }]}>
          Login
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
    marginTop: 250,
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2e7d32",
    marginTop: 10,
    marginBottom: 20,
  },
  subText: {
    color: "#555",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#388E3C",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
