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
    checkbox: {
      borderColor: theme.colors.primary?.main,
      borderWidth: 1,
      width: 25,
      height: 25,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: !checked ? "transparent" : theme.colors?.primary?.main,
      marginRight: 8,
    },
    checkboxText: {
      fontFamily: theme.typography.fonts?.primary.normal,
      color: theme.colors.text?.main,
      fontSize: theme.typography.size.body,
    },
    checkBoxDisabled: {
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
