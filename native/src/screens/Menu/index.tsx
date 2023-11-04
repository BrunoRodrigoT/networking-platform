import { Card, CardBase, Container } from "@components";
import { useTheme } from "@contexts";
import { Ionicons } from "@expo/vector-icons";
import { IRootStackParamList } from "@models/Screens";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { formatWithMask } from "@utils/mask";
import { RegexOf } from "@config";

type Props = NativeStackScreenProps<IRootStackParamList, "MENU">;

export default function Menu({ navigation }: Props) {
  const theme = useTheme();
  const style = styles();

  const [eye, setEye] = React.useState<boolean>(false);

  const cards = [
    {
      text: "Calcular",
      icon: <Ionicons name="calculator-outline" style={style.iconCard} />,
      route: "CHECK_OVERTIME",
    },
    {
      text: "Dashboards",
      icon: <Ionicons name="stats-chart-outline" style={style.iconCard} />,
      route: "CHECK_LIST",
    },
    {
      text: "Perfil",
      icon: <Ionicons name="person-outline" style={style.iconCard} />,
      route: "CHECK_LIST",
    },
  ];

  return (
    <Container styles={{ gap: 30, padding: theme.shape.padding }}>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          marginTop: 30,
        }}
      >
        <View>
          <Text style={style.title}>
            <Ionicons name="time-outline" size={theme.typography.size.title} />
            ver
            <Text
              style={{
                fontFamily: theme.typography.fonts.title.normal,
              }}
            >
              time
            </Text>
          </Text>
          <Text style={style.subtitle}>Calculadora de horas extras</Text>
        </View>
        <Ionicons
          name="notifications-outline"
          size={theme.typography.size.title}
          color={theme.colors.common.white}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: 20,
          alignItems: "center",
        }}
      >
        {eye ? (
          <>
            <Text style={style.values}>
              {formatWithMask({ text: "00.00", mask: RegexOf.price }).masked}
            </Text>
            <TouchableOpacity onPress={() => setEye(!eye)}>
              <Ionicons name="eye" style={style.values} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={style.values}>R$: -- --</Text>
            <TouchableOpacity onPress={() => setEye(!eye)}>
              <Ionicons name="eye-off" style={style.values} />
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={{ gap: 10, flex: 1 }}>
        {cards.map((e, index) => {
          return (
            <CardBase
              onPress={() => {
                navigation.navigate(e?.route);
              }}
              key={index}
              styles={{
                padding: theme.shape.padding,
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: theme.typography.size.body,
                  fontFamily: theme.typography.fonts.secondary.normal,
                }}
              >
                {e.text}
              </Text>
              {e.icon}
            </CardBase>
          );
        })}
      </View>
    </Container>
  );
}
