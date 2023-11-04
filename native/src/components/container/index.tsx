import React, { FunctionComponent } from "react";
import { SafeAreaView, View } from "react-native";
import IContainer from "./types";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@contexts";
import { LinearGradient } from "expo-linear-gradient";

const Container: FunctionComponent<IContainer> = ({ children, styles }) => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background.dark,
      }}
    >
      <StatusBar style="auto" />
      <LinearGradient
        colors={["#fe7c30be", "#9903037b", "#0004088a", "#000000"]}
        style={{ flex: 1 }}
      >
        <View style={[{ flex: 1 }, styles]}>{children}</View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Container;
