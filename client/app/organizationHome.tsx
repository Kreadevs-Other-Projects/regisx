import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";
import { router } from "expo-router";

const OrganizationHome = () => {
  const organization = {
    name: "City Health Center",
    logo: "https://cdn-icons-png.flaticon.com/512/2965/2965879.png",
    opening: "9:00 AM",
    closing: "5:00 PM",
    totalQueues: 34,
    date: new Date().toDateString(),
  };

  return (
    <>
      <ScrollView style={styles.container}>
        {/* Header */}
        {/* <View style={styles.header}>
        <View>
          <Text style={styles.title}>{organization.name}</Text>
          <Text style={styles.subtitle}>Welcome back!</Text>
        </View>
        <Image source={{ uri: organization.logo }} style={styles.logo} />
      </View> */}

        <Header name="Meezan Bank" logo="client\assets\images\chasebank.png" />

        {/* Info Section */}
        <View style={styles.infoContainer}>
          <View style={styles.infoCard}>
            <Ionicons name="calendar" size={28} color="#4CAF50" />
            <View>
              <Text style={styles.cardLabel}>Today</Text>
              <Text style={styles.cardValue}>{organization.date}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="people" size={28} color="#2196F3" />
            <View>
              <Text style={styles.cardLabel}>Total Queues</Text>
              <Text style={styles.cardValue}>{organization.totalQueues}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="time" size={28} color="#FF9800" />
            <View>
              <Text style={styles.cardLabel}>Working Hours</Text>
              <Text style={styles.cardValue}>
                {organization.opening} - {organization.closing}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Section */}
        <TouchableOpacity style={styles.addButton} onPress={() => router.navigate('/AddQueue')}>
          <Ionicons name="add-circle-outline" size={22} color="#fff" />
          <Text style={styles.addButtonText}>Add New Queue</Text>
        </TouchableOpacity>

        {/* Unique Feature Section */}
        <View style={styles.featureSection}>
          <Text style={styles.featureTitle}>Upcoming Features 🚀</Text>
          <Text style={styles.featureText}>
            Soon you’ll be able to auto-generate queue tickets, send reminders
            to users, and monitor live waiting times — all from this dashboard!
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

export default OrganizationHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 10,
  },
  cardLabel: {
    fontSize: 13,
    color: "#777",
  },
  cardValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  featureSection: {
    backgroundColor: "#e8f5e9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 40,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2e7d32",
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: "#2e7d32",
    lineHeight: 20,
  },
});
