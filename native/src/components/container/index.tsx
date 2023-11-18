import React, { FunctionComponent } from "react";
import { SafeAreaView, View } from "react-native";
import IContainer from "./types";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@contexts";

const Container: FunctionComponent<IContainer> = ({ children, styles }) => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background.main,
      }}
    >
      <StatusBar style="auto" />

      <View style={[{ flex: 1 }, styles]}>{children}</View>
    </SafeAreaView>
  );
};

export default Container;
