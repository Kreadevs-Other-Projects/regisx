import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const navigation = useNavigation();

  const naviate = () => {
    const timeout = setTimeout(() => {
      router.navigate("/auth/orgAuth");
    }, 500);
    return () => clearTimeout(timeout);
  };

  useEffect(() => {
    naviate();
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Index</Text>
    </View>
  );
}
