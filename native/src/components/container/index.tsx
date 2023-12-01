import React, { FunctionComponent } from "react";
import { ImageBackground, SafeAreaView, View } from "react-native";
import IContainer from "./types";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@contexts";

const Container: FunctionComponent<IContainer> = ({
  children,
  styles,
  image,
  imageStyle,
}) => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background.main,
      }}
    >
      <StatusBar style="auto" translucent />

      {image ? (
        <ImageBackground
          source={require("@assets/icons/imgs/background.png")}
          resizeMode="cover"
          imageStyle={imageStyle}
          style={[{ flex: 1 }, styles]}
        >
          {children}
        </ImageBackground>
      ) : (
        <View style={[{ flex: 1 }, styles]}>{children}</View>
      )}
    </SafeAreaView>
  );
};

export default Container;
