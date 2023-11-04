import { ReactNode } from "react";
import { ImageStyle, StyleProp, ViewStyle } from "react-native";

interface IContainer {
  children: ReactNode;
  image?: boolean;
  background?: boolean;
  styles?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

export default IContainer;
