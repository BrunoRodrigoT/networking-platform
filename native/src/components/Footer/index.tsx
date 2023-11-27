import React from "react";
import { View } from "react-native";
import IFooterProps from "./types";
import { useTheme } from "@contexts";

function Footer({ children, styles }: IFooterProps) {
  const theme = useTheme();
  return (
    <View
      style={[
        {
          padding: theme.shape.padding,
          height: 100,
          backgroundColor: theme.colors.common?.white,
        },
        styles,
      ]}
    >
      {children}
    </View>
  );
}

export default Footer;
