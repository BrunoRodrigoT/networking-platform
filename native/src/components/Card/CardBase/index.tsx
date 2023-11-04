import React from "react";
import { TouchableOpacity } from "react-native";
import { ICardBaseProps } from "./types";

import styles from "./styles";

export default function CardBase(props: ICardBaseProps) {
  const cardBaseStyles = styles();
  return (
    <TouchableOpacity
      style={[cardBaseStyles.container, props.styles]}
      activeOpacity={props.onPress ? 0.5 : 1}
      onPress={props.onPress}
    >
      {props.children}
    </TouchableOpacity>
  );
}
