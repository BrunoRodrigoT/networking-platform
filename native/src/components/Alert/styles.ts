import { StyleSheet } from "react-native";
import IAlertProps from "./types";
import { useTheme } from "@contexts";
export const styles = (severity: IAlertProps["severity"] = "success") => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      position: "absolute",
      top: 30,
      zIndex: 10000,
      overflow: "visible",
      backgroundColor: theme.colors[severity]?.light,
      minWidth: 300,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: theme.shape.padding,
      paddingVertical: 10,
      borderRadius: theme.shape.borderRadius,
      alignSelf: "center",
      marginHorizontal: 10,
    },
    message: {
      fontFamily: theme.typography.fonts?.primary.medium,
      fontSize: 16,
      color: theme.colors[severity]?.dark,
      flexWrap: "wrap",
      flex: 1,
    },
    icon: {
      color: "red",
    },
  });
};
