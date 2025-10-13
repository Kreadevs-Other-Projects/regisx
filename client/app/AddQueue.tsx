import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import DateTimePicker, {
  AndroidEvent,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import ScreenWrapper from "@/components/ScreenWrapper";

// 🟢 Define the shape of your form data
interface QueueForm {
  queueName: string;
  totalTickets: string;
  startTime: Date;
  endTime: Date;
}

const AddQueue: React.FC = () => {
  const [form, setForm] = useState<QueueForm>({
    queueName: "",
    totalTickets: "",
    startTime: new Date(),
    endTime: new Date(),
  });

  const [showStartPicker, setShowStartPicker] = useState<boolean>(false);
  const [showEndPicker, setShowEndPicker] = useState<boolean>(false);

  // 🔹 Update form fields dynamically
  const handleInputChange = (key: keyof QueueForm, value: string | Date) => {
    setForm((prevForm) => ({ ...prevForm, [key]: value }));
  };

  // 🔹 Handle Start Time Picker change
  const onStartChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) handleInputChange("startTime", selectedDate);
    setShowStartPicker(false);
  };

  // 🔹 Handle End Time Picker change
  const onEndChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) handleInputChange("endTime", selectedDate);
    setShowEndPicker(false);
  };

  // 🔹 Handle Submit
  const handleSubmit = () => {
    const { queueName, totalTickets } = form;

    if (!queueName.trim() || !totalTickets.trim()) {
      Alert.alert("Validation Error", "Please fill in all fields");
      return;
    }

    console.log("Queue Created:", form);
    Alert.alert("Success", "Queue added successfully ✅");
  };

  return (
    <View style={styles.container}>
      <ScreenWrapper>
        <ScrollView>
          <Text style={styles.heading}>Add New Queue</Text>
          <Text style={styles.subText}>
            Create and manage today's queues efficiently.
          </Text>

          {/* Queue Name */}
          <Text style={styles.label}>Queue Name</Text>
          <TextInput
            placeholder="e.g., Cash Withdrawal"
            placeholderTextColor="#888"
            style={styles.input}
            value={form.queueName}
            onChangeText={(text) => handleInputChange("queueName", text)}
          />

          {/* Total Tickets */}
          <Text style={styles.label}>Total Tickets</Text>
          <TextInput
            placeholder="e.g., 50"
            placeholderTextColor="#888"
            style={styles.input}
            keyboardType="numeric"
            value={form.totalTickets}
            onChangeText={(text) => handleInputChange("totalTickets", text)}
          />

          {/* Start Time */}
          <Text style={styles.label}>Start Time</Text>
          <TouchableOpacity
            style={styles.timePickerButton}
            onPress={() => setShowStartPicker(true)}
          >
            <Ionicons name="time-outline" size={20} color="#fff" />
            <Text style={styles.timeText}>
              {form.startTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </TouchableOpacity>

          {showStartPicker && (
            <DateTimePicker
              value={form.startTime}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onStartChange}
            />
          )}

          {/* End Time */}
          <Text style={styles.label}>End Time</Text>
          <TouchableOpacity
            style={styles.timePickerButton}
            onPress={() => setShowEndPicker(true)}
          >
            <Ionicons name="time-outline" size={20} color="#fff" />
            <Text style={styles.timeText}>
              {form.endTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </TouchableOpacity>

          {showEndPicker && (
            <DateTimePicker
              value={form.endTime}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onEndChange}
            />
          )}

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Ionicons name="add-circle-outline" size={22} color="#fff" />
            <Text style={styles.submitText}>Create Queue</Text>
          </TouchableOpacity>
        </ScrollView>
      </ScreenWrapper>
    </View>
  );
};

export default AddQueue;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    padding: 20,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2e7d32",
    marginTop: 10,
  },
  subText: {
    color: "#666",
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
    marginTop: 12,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#000",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  timePickerButton: {
    backgroundColor: "#2e7d32",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    padding: 12,
    marginTop: 6,
  },
  timeText: {
    color: "#fff",
    fontSize: 16,
  },
  submitBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#388E3C",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 30,
  },
  submitText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 8,
  },
});
