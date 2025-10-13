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
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

// 🟩 Interface for form data
interface OrgForm {
  name: string;
  email: string;
  password: string;
  orgType: string;
  city: string;
  country: string;
  fullAddress: string;
  logo: string | null;
}

const RegisterOrganization: React.FC = () => {
  const [form, setForm] = useState<OrgForm>({
    name: "",
    email: "",
    password: "",
    orgType: "",
    city: "",
    country: "",
    fullAddress: "",
    logo: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof OrgForm, value: string) => {
    setForm({ ...form, [key]: value });
  };

  // 📸 Pick image from gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setForm({ ...form, logo: uri });
    }
  };

  // 📨 Submit form
  const handleSubmit = async () => {
    const { name, email, password, orgType, city, country, fullAddress, logo } =
      form;

    if (
      !name ||
      !email ||
      !password ||
      !orgType ||
      !city ||
      !country ||
      !fullAddress ||
      !logo
    ) {
      Alert.alert(
        "Missing Fields",
        "Please fill all fields and upload a logo."
      );
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("orgType", orgType);
      formData.append("city", city);
      formData.append("country", country);
      formData.append("fullAddress", fullAddress);

      if (logo) {
        const fileName = logo.split("/").pop()!;
        const fileType = fileName.split(".").pop();
        formData.append("logo", {
          uri: logo,
          name: fileName,
          type: `image/${fileType}`,
        } as any);
      }

      const response = await fetch(
        "http://192.168.100.7:5000/api/org/register", { 
          method: "POST",
          headers: { 
            "Content-Type": "multipart/form-data" 
          },
          body: formData
        }
      );

      Alert.alert("Success");
      router.navigate({pathname: '/verifyEmail', params: {email: form.email}})
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
      <Text style={styles.heading}>Register Organization</Text>
      <Text style={styles.subText}>
        Create your organization account below.
      </Text>

      {/* Logo Picker */}
      <TouchableOpacity style={styles.logoPicker} onPress={pickImage}>
        {form.logo ? (
          <Image source={{ uri: form.logo }} style={styles.logoImage} />
        ) : (
          <View style={styles.logoPlaceholder}>
            <Ionicons name="image-outline" size={40} color="#888" />
            <Text style={{ color: "#888", marginTop: 5 }}>Upload Logo</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Organization Name"
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

      {/* Organization Type */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={form.orgType}
          onValueChange={(value) => handleChange("orgType", value)}
        >
          <Picker.Item label="Select Organization Type" value="" />
          <Picker.Item label="Bank" value="bank" />
          <Picker.Item label="Hospital" value="hospital" />
          <Picker.Item label="Government Office" value="government" />
          <Picker.Item label="Private Company" value="private" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="City"
        value={form.city}
        onChangeText={(text) => handleChange("city", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={form.country}
        onChangeText={(text) => handleChange("country", text)}
      />
      <TextInput
        style={[styles.input, { height: 90 }]}
        placeholder="Full Address"
        multiline
        value={form.fullAddress}
        onChangeText={(text) => handleChange("fullAddress", text)}
      />

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        disabled={loading}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>
          {loading ? "Registering..." : "Register Organization"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterOrganization;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2e7d32",
    marginTop: 10,
  },
  subText: {
    color: "#555",
    marginBottom: 20,
  },
  logoPicker: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#eaeaea",
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
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
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
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
