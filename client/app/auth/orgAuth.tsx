import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  Platform,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";
import { colors } from "@/constants/style";
import { verticalScale } from "react-native-size-matters";
import ScreenWrapper from "@/components/ScreenWrapper";

export default function OrgOnboarding() {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [showDate, setShowDate] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    openTime: new Date(),
    closeTime: new Date(),
    days: [] as string[],
    orgType: "",
  });

  const categories = [
    { label: "Health Care", value: "healthcare" },
    { label: "Banks", value: "bank" },
    { label: "Government", value: "government" },
    { label: "Education", value: "education" },
    { label: "Corporate", value: "corporate" },
    { label: "Telecom", value: "telecom" },
  ];

  const toggleDay = (day: string) => {
    setForm((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  const onTimeChange = (
    key: "openTime" | "closeTime",
    event: any,
    selectedTime?: Date
  ) => {
    if (event.type === "dismissed") {
      setShowDate(false);
      return;
    }
    if (selectedTime) {
      setForm({
        ...form,
        [key]: selectedTime,
      });
    }
    setShowDate(false);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
    else setModalVisible(true);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleRegister = async () => {
    try {
      const res = await fetch("http://192.168.100.102:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          profileImage: image,
        }),
      });

      const data = await res.json();
      console.log(data);
      setModalVisible(false);
      alert("Organization Registered Successfully!");
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenWrapper>
        <ScrollView
          contentContainerStyle={{ padding: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.heading}>Organization Onboarding</Text>

          {step === 1 ? (
            <>
              <Text style={styles.subHeading}>Personal Details</Text>
              <TextInput
                placeholder="Organization Name"
                style={styles.input}
                value={form.name}
                onChangeText={(t) => setForm({ ...form, name: t })}
              />
              <TextInput
                placeholder="Email"
                style={styles.input}
                keyboardType="email-address"
                value={form.email}
                onChangeText={(t) => setForm({ ...form, email: t })}
              />
              <TextInput
                placeholder="Password"
                style={styles.input}
                secureTextEntry
                value={form.password}
                onChangeText={(t) => setForm({ ...form, password: t })}
              />

              <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.subHeading}>Organization Details</Text>

              <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
                <Text style={{ color: colors.primary, fontWeight: "600" }}>
                  Upload Organization Logo
                </Text>
              </TouchableOpacity>
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 50,
                    alignSelf: "center",
                    marginVertical: 10,
                  }}
                />
              )}

              <TextInput
                placeholder="Full Address"
                style={styles.input}
                value={form.address}
                onChangeText={(t) => setForm({ ...form, address: t })}
              />

              {!showDate && (
                <Pressable
                  style={styles.dateInput}
                  onPress={() => setShowDate(true)}
                >
                  <Text style={{ fontSize: 16 }}>
                    {form.openTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </Pressable>
              )}

              <Text style={styles.label}>Opening Time</Text>
              {showDate && (
                <DateTimePicker
                  value={form.openTime as Date}
                  mode="time" // 👈 change this
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={(event, time) =>
                    onTimeChange("openTime", event, time)
                  }
                />
              )}

              {!showDate && (
                <Pressable
                  style={styles.dateInput}
                  onPress={() => setShowDate(true)}
                >
                  <Text style={{ fontSize: 16 }}>
                    {form.openTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </Pressable>
              )}

              <Text style={styles.label}>Closing Time</Text>
              {showDate && (
                <DateTimePicker
                  value={form.closeTime as Date}
                  mode="time"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={(event, time) =>
                    onTimeChange("closeTime", event, time)
                  }
                />
              )}

              <Text style={styles.label}>Select Working Days</Text>
              <View style={styles.daysRow}>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day) => (
                    <TouchableOpacity
                      key={day}
                      onPress={() => toggleDay(day)}
                      style={[
                        styles.dayButton,
                        form.days.includes(day) && {
                          backgroundColor: colors.primary,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          form.days.includes(day) && { color: "white" },
                        ]}
                      >
                        {day}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </View>

              <Text style={styles.label}>Organization Type</Text>
              <Dropdown
                style={styles.dropdown}
                data={categories}
                labelField="label"
                valueField="value"
                placeholder="Select Organization Type"
                value={form.orgType}
                onChange={(item) => setForm({ ...form, orgType: item.value })}
              />

              <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePrev}>
                <Text style={styles.backText}>Back</Text>
              </TouchableOpacity>
            </>
          )}

          {/* ✅ Verification Modal */}
          <Modal visible={isModalVisible} transparent animationType="slide">
            <View style={styles.modalOverlay}>
              <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>Email Verification</Text>
                <Text style={styles.modalSub}>
                  Please enter the 6-digit code sent to your email.
                </Text>
                <TextInput
                  placeholder="Enter verification code"
                  keyboardType="numeric"
                  maxLength={6}
                  value={verificationCode}
                  onChangeText={setVerificationCode}
                  style={styles.input}
                />

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleRegister()}
                >
                  <Text style={styles.buttonText}>Verify & Register</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonOutline}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.outlineText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </ScreenWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 15,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "600",
    color: "#444",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    marginBottom: 15,
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 8,
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "600" },
  backText: {
    textAlign: "center",
    color: colors.primary,
    marginTop: 10,
    fontWeight: "500",
  },
  uploadBtn: {
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  daysRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 15,
  },
  dayButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  dayText: {
    color: colors.primary,
    fontWeight: "500",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 8,
  },
  modalSub: {
    color: "#555",
    textAlign: "center",
    marginBottom: 15,
  },
  buttonOutline: {
    borderWidth: 1.5,
    borderColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  outlineText: {
    color: colors.primary,
    fontWeight: "600",
  },

  dateInput: {
    height: verticalScale(40),
    backgroundColor: colors.neutral100,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: 17,
    borderCurve: "continuous",
    paddingHorizontal: 15,
  },
});
