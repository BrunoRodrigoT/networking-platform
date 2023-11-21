import { useTheme } from "@contexts";
import { StyleSheet } from "react-native";

const styles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    input: {
      position: "relative",
      zIndex: 100,
      elevation: 1,
    },
    font: {
      fontFamily: theme.typography.fonts.primary.normal,
      fontSize: theme.typography.size.regular,
      marginLeft: 10,
      color: theme.colors.text?.main,
    },
    container: {
      backgroundColor: theme.colors.common?.white,
      borderRadius: 10,
    },
    flatList: {
      marginTop: 10,
      height: 110,
    },
  });
};

export default styles;
