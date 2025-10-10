import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { moderateScale, scale } from "react-native-size-matters";
import { colors } from "@/constants/style";

const EntranceScreen = () => {
  return (
    <View>
      <ScreenWrapper>
        <View>
          <Text
            style={{
              textAlign: "center",
              paddingHorizontal: moderateScale(110),
              fontSize: scale(18),
              fontWeight: 600,
              color: colors.neutral500,
            }}
          >
            Regis
            <Text style={{ color: "#25d303ff" }}>X</Text>
          </Text>
        </View>

        <View>
          <TouchableOpacity></TouchableOpacity>
        </View>
      </ScreenWrapper>
    </View>
  );
};

export default EntranceScreen;

const styles = StyleSheet.create({});
