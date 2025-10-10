import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "@/constants/style";

type LoadingProps = {
  size?: "large";
  color?: string;
};

const Loading = ({ size = "large", color = colors.primary }: LoadingProps) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
