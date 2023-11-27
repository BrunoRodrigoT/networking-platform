import { useTheme } from "@contexts";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Steps() {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      gap: 70,
      justifyContent: "center",
      paddingBottom: theme.shape.padding,
    },
    step: {
      width: 50,
      height: 50,
      borderRadius: 30,
      backgroundColor: theme.colors.text.light,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.step}>
        <Text>1</Text>
      </View>
      <View style={styles.step}>
        <Text>2</Text>
      </View>
      <View style={styles.step}>
        <Text>3</Text>
      </View>
    </View>
  );
}
