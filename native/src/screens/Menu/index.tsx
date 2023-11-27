import { Button, Card, CardBase, Container } from "@components";
import { AuthContext, useTheme } from "@contexts";
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

  const { SignOut } = React.useContext(AuthContext);

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
        <Button
          variant="primary"
          onPress={() => {
            SignOut();
          }}
        >
          logout
        </Button>
      </View>
    </Container>
  );
}
