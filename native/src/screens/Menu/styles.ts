import { useTheme } from "@contexts";
import { StyleSheet } from "react-native";

export default function () {
  const theme = useTheme();

  return StyleSheet.create({
    title: {
      fontSize: theme.typography.size.title,
      fontFamily: theme.typography.fonts.title.normal,
      color: theme.colors.primary.dark,
    },
    subtitle: {
      fontSize: theme.typography.size.body,
      fontFamily: theme.typography.fonts.primary.light,
      color: theme.colors.primary.dark,
    },

    values: {
      fontSize: theme.typography.size.regular,
      fontFamily: theme.typography.fonts.secondary.normal,
      color: theme.colors.primary.dark,
    },

    iconCard: {
      fontSize: theme.typography.size.title,
      fontFamily: theme.typography.fonts.secondary.normal,
      color: theme.colors.text.main,
    },
    card: {
      padding: theme.shape.padding,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
}
