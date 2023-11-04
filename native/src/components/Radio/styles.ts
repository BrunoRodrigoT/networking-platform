import { useTheme } from "@contexts";
import { StyleSheet } from "react-native";

const styles = (checked: boolean, disabled?: boolean) => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
    },
    radio: {
      borderColor: theme.colors.primary?.main,
      borderWidth: 1,
      width: 25,
      height: 25,
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 8,
    },
    radioBackground: {
      width: 16,
      height: 16,
      borderRadius: 100,
      backgroundColor: !checked ? "transparent" : theme.colors?.primary?.dark,
    },
    radioText: {
      fontFamily: theme.typography.fonts?.primary.normal,
      color: theme.colors.text?.dark,
      fontSize: theme.typography.size.body,
    },
    radioDisabled: {
      borderColor: theme.colors.text?.light,
    },
    radioBackgroundDisabled: {
      borderColor: theme.colors.text?.light,
      backgroundColor:
        checked && disabled ? theme.colors.text?.light : "transparent",
    },
    textDisabled: {
      color: theme.colors.text?.light,
    },
  });
};
export default styles;
