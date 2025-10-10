import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import Loading from "./Loading";
import { colors } from "@/constants/style";
import { verticalScale } from "react-native-size-matters";

type ButtonProps = {
  style?: ViewStyle;
  onPress?: () => void;
  loading?: boolean;
  children?: React.ReactNode;
};

const Button = ({ style, onPress, loading, children }: ButtonProps) => {
  if (loading) {
    <View>
      <Loading />
    </View>;
  }

  return (
    <TouchableOpacity style={[style, styles.button]}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    borderCurve: "continuous",
    height: verticalScale(20),
    justifyContent: "center",
    alignItems: "center",
  },
});
