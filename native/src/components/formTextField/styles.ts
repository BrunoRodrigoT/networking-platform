import { useTheme } from "@contexts";
import { StyleSheet } from "react-native";

export const styles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      justifyContent: "flex-start",
    },
    inputContainer: {
      borderWidth: 1,
      marginTop: 10,
      borderRadius: theme.shape.borderRadius,
      borderColor: theme.colors.secondary?.main,
      backgroundColor: theme.colors.common?.white,
      flexDirection: "row",
      alignItems: "center",
    },
    input: {
      padding: 10,
      flex: 1,
      marginLeft: 10,
      fontSize: theme.typography.size?.regular,
      borderRadius: theme.shape.borderRadius,
      color: theme.colors.text?.main,
      fontFamily: theme.typography.fonts?.primary.normal,
    },
    label: {
      color: theme.colors.text?.dark,
      fontSize: theme.typography.size?.regular,
      fontFamily: theme.typography.fonts?.primary.normal,
    },
    error: {
      fontFamily: theme.typography.fonts?.primary.normal,
      marginTop: 10,
      color: theme.colors.error?.dark,
      paddingHorizontal: 10,
    },
  });
};
