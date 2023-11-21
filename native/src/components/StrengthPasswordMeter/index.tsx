import React from "react";
import { Text, View } from "react-native";
import { IStrengthPasswordMeter } from "./types";
import Check from "@assets/icons/svgs/icons/check.svg";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useTheme } from "@contexts";

export default function StrengthPasswordMeter({
  password,
}: IStrengthPasswordMeter) {
  const theme = useTheme();
  let strength = 0;

  let case1: boolean = false;
  let case2: boolean = false;
  let case3: boolean = false;
  let case4: boolean = false;
  let case5: boolean = false;

  if (password.length >= 6) {
    strength++;
    case1 = true;
  }
  if (password.match(/[a-z]+/)) {
    strength++;
    case2 = true;
  }
  if (password.match(/[A-Z]+/)) {
    strength++;
    case3 = true;
  }
  if (password.match(/[0-9]+/)) {
    strength++;
    case4 = true;
  }
  if (password.match(/[^a-zA-Z 0-9]+/)) {
    strength++;
    case5 = true;
  }

  return (
    <Animated.View entering={FadeIn.duration(800)}>
      <Text
        style={{
          color: theme.colors.primary?.main,
          fontSize: theme.typography.size.body,
        }}
      >
        A senha deve conter:
      </Text>
      <Text
        style={{
          color: case1 ? theme.colors.success?.main : theme.colors.text?.light,
          fontSize: theme.typography.size.caption,
        }}
      >
        - No mínimo 06 caracteres{" "}
        {case1 && (
          <Check
            fill={theme.colors.success?.main}
            width={theme.typography.size.caption}
          />
        )}
      </Text>
      <Text
        style={{
          color: case2 ? theme.colors.success?.main : theme.colors.text?.light,
          fontSize: theme.typography.size.caption,
        }}
      >
        - Letra minúscula{" "}
        {case2 && (
          <Check
            fill={theme.colors.success?.main}
            width={theme.typography.size.caption}
          />
        )}
      </Text>
      <Text
        style={{
          color: case3 ? theme.colors.success?.main : theme.colors.text?.light,
          fontSize: theme.typography.size.caption,
        }}
      >
        - Letra maiúscula{" "}
        {case3 && (
          <Check
            fill={theme.colors.success?.main}
            width={theme.typography.size.caption}
          />
        )}
      </Text>
      <Text
        style={{
          color: case4 ? theme.colors.success?.main : theme.colors.text?.light,
          fontSize: theme.typography.size.caption,
        }}
      >
        - Número{" "}
        {case4 && (
          <Check
            fill={theme.colors.success?.main}
            width={theme.typography.size.caption}
          />
        )}
      </Text>
      <Text
        style={{
          color: case5 ? theme.colors.success?.main : theme.colors.text?.light,
          fontSize: theme.typography.size.caption,
        }}
      >
        - Carácter especial{" "}
        {case5 && (
          <Check
            fill={theme.colors.success?.main}
            width={theme.typography.size.caption}
          />
        )}
      </Text>
    </Animated.View>
  );
}
