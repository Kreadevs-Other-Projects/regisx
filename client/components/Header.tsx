import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type HeaderProps = {
    name?: string;
    logo?: string
}

const Header = ({ name, logo }: HeaderProps) => {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>Welcome back 👋</Text>
      </View>
      {logo && <Image source={{ uri: logo }} style={styles.logo} />}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Header;
