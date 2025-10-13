import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import { moderateScale, scale } from "react-native-size-matters";
import { colors } from "@/constants/style";
import { router } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";

const EntranceScreen = () => {
  const xOffset = useSharedValue(100);
  const buttonOpacity = useSharedValue(0);
  const buttonScale = useSharedValue(0.8);

  useEffect(() => {
    xOffset.value = withDelay(800, withTiming(1, { duration: 2000 }));
    buttonOpacity.value = withDelay(800, withTiming(1, { duration: 600 }));
    buttonScale.value = withDelay(800, withTiming(1, { duration: 600 }));
  }, []);

  const xStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: xOffset.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ scale: buttonScale.value }],
  }));

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View>
          <Text style={styles.logoText}>
            Regis
            <Animated.Text style={[styles.logoX, xStyle]}>X</Animated.Text>
          </Text>
        </View>

        <Animated.View style={[buttonAnimatedStyle]}>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => router.push("/auth/OrgAuth/RegisterOrg")}
          >
            <Text style={styles.buttonText}>Organization</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.neutral200 }]}
            onPress={() => router.push("/auth/UserAuth/RegisterUser")}
          >
            <Text style={[styles.buttonText, { color: colors.neutral500 }]}>
              User
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ScreenWrapper>
  );
};

export default EntranceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    textAlign: "center",
    paddingHorizontal: moderateScale(110),
    fontSize: scale(35),
    fontWeight: "600",
    color: colors.neutral500,
  },
  logoX: {
    color: "#25d303ff",
  },
  button: {
    backgroundColor: "#25d303ff",
    padding: 12,
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
