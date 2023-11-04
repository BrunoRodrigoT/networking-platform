import { useTheme } from "@contexts";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface IGoBackProps {
  title?: string;
  subtitle?: string;
}

export default function GoBack({ title, subtitle }: IGoBackProps) {
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
      <TouchableOpacity onPress={goBack}>
        <Ionicons
          name="arrow-back"
          color={theme.colors.common.white}
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
          {title ? (
            title
          ) : (
            <>
              <Ionicons
                name="time-outline"
                size={theme.typography.size.title}
              />
              vertime
            </>
          )}
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
