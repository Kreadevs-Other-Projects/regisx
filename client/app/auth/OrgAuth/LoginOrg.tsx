import React, { useContext, useRef, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { AppContext } from "../../../context/context";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface OrgForm {
  email: string;
  password: string;
}

interface MyJwtPayload {
  id: string;
}

const LoginOrg: React.FC = () => {
  const { setOrgId, setOrgToken, orgToken, orgId } = useContext(AppContext);

  const [form, setForm] = useState<OrgForm>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const orgRef = useRef<string | null>(null);

  const handleChange = (key: keyof OrgForm, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    const { email, password } = form;

    if (!email || !password) {
      Alert.alert(
        "Missing Fields",
        "Please fill all fields and upload a logo."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://192.168.100.60:5000/api/org/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const result = await response.json();
      if (!result.success) {
        Toast.show({
          type: "error",
          text1: result.message,
        });
      }

      AsyncStorage.setItem("OrgToken", result.token);
      setOrgToken(result.token);

      const decodeToken = jwtDecode<MyJwtPayload>(result.token);
      const storedOrgToken = decodeToken?.id;
      if (storedOrgToken) {
        orgRef.current = storedOrgToken;
        setOrgId(storedOrgToken);
      } else {
        ("No user found");
      }

      router.navigate({
        pathname: "/organizationHome",
      });
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
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>User Organization</Text>
        {/* <Text style={styles.subText}>Create User account</Text> */}

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
          <Text style={styles.buttonText}>
            {loading ? "Login..." : "Login"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default LoginOrg;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
    marginTop: 200,
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2e7d32",
    marginTop: 10,
    marginBottom: 10,
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
