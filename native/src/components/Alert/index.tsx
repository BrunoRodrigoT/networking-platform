import React, { useRef } from "react";
import { Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import CheckedOutline from "@assets/icons/svgs/icons/check.svg";
import Info from "@assets/icons/svgs/icons/info.svg";
import IAlertProps from "./types";

import { styles } from "./styles";
import { useTheme } from "@contexts";
const DURATION = 800;
function Alert({
  message,
  open = false,
  onClose,
  testID,
  severity = "success",
  duration = 2000,
}: IAlertProps) {
  const alertStyles = styles(severity);
  const theme = useTheme();
  const opacity = useSharedValue(0);
  const display = useSharedValue<"none" | "flex">("none");
  const timeout = useRef<NodeJS.Timeout>();
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      display: display.value,
    };
  }, []);

  React.useEffect(() => {
    if (open) {
      display.value = "flex";
      opacity.value = withTiming(1, { duration: DURATION });
      timeout.current = setTimeout(() => {
        opacity.value = withTiming(0, { duration: 200 }, () => {
          display.value = "none";
          if (onClose) {
            runOnJS(onClose)();
          }
        });
      }, duration);
    } else {
      opacity.value = withTiming(0, { duration: 50 });
    }
    return () => {
      clearTimeout(timeout.current);
    };
  }, [duration, open]);

  const icons = {
    warning: (
      <Info
        fill={theme.colors.warning?.dark}
        style={{
          marginRight: 10,
        }}
        width={20}
        height={20}
      />
    ),
    success: (
      <CheckedOutline
        fill={theme.colors.success?.dark}
        width={20}
        height={20}
        style={{
          marginRight: 10,
        }}
      />
    ),
    error: (
      <Info
        fill={theme.colors.error?.dark}
        width={20}
        height={20}
        style={{
          marginRight: 10,
        }}
        transform={[
          {
            rotate: "180deg",
          },
        ]}
      />
    ),
  };
  return (
    <Animated.View style={[alertStyles.container, animatedStyle]}>
      {icons[severity]}
      <Text testID={testID} style={alertStyles.message}>
        {message}
      </Text>
    </Animated.View>
  );
}

export default Alert;
