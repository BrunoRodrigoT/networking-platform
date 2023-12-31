import { useTheme } from "@contexts";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface IGoBackProps {
  title?: string;
  subtitle?: string;
  goBacksTo?: () => void;
}

export default function GoBack({ title, subtitle, goBacksTo }: IGoBackProps) {
  const theme = useTheme();
  const { goBack } = useNavigation();
  return (
    <View
      style={{
        paddingTop: theme.shape.padding,
        flexDirection: "row",
        gap: 20,
      }}
    >
      <TouchableOpacity onPress={goBacksTo ? goBacksTo : goBack}>
        <Ionicons
          name="arrow-back"
          color={theme.colors.primary.main}
          size={theme.typography.size.title}
        />
      </TouchableOpacity>
      <View>
        <Text
          style={{
            fontSize: theme.typography.size.regular,
            fontFamily: theme.typography.fonts.secondary.normal,
            color: theme.colors.primary.dark,
          }}
        >
          {title ? title : <></>}
        </Text>

        <Text
          style={{
            fontSize: theme.typography.size.body,
            fontFamily: theme.typography.fonts.primary.light,
            color: theme.colors.primary.dark,
          }}
        >
          {subtitle}
        </Text>
      </View>
    </View>
  );
}
