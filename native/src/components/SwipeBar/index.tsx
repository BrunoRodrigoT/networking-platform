import { AuthContext, useTheme } from "@contexts";
import React from "react";
import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CardBase from "../Card/CardBase";
import Card from "../Card";
import { useNavigation } from "@react-navigation/native";
import Button from "../Button";
import { Ionicons } from "@expo/vector-icons";
import Logo from "@assets/icons/svgs/icons/logo.svg";

export default function SwipeBar() {
  const theme = useTheme();
  const { state, SignOut } = React.useContext(AuthContext);
  const navigation = useNavigation();

  const routes = [
    {
      name: "Página Inicial",
      route: "MENU",
    },
    {
      name: "Perfil",
      route: "PROFILE",
    },
    {
      name: "Minhas Postagens",
      route: "PROFILE",
    },
    {
      name: "Favoritos",
      route: "FAVORITES",
    },
    {
      name: "Ajuda",
      route: "PROFILE",
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.primary.dark,
      }}
    >
      <ImageBackground
        source={require("@assets/icons/imgs/background.png")}
        resizeMode="cover"
        style={[{ flex: 1, padding: theme.shape.padding }]}
      >
        {/* <Logo width={120} style={{ alignSelf: "center" }} /> */}

        <Text
          style={{
            color: theme.colors.common.white,
            fontFamily: theme.typography.fonts.primary.normal,
            fontSize: theme.typography.size.regular,
            flexWrap: "wrap",
            paddingVertical: 20,
          }}
        >
          Olá, {state.data.user.username}
        </Text>

        <FlatList
          data={routes}
          contentContainerStyle={{ gap: 30, paddingTop: 50 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate(item.route as never)}
              style={{
                borderBottomColor: theme.colors.text.dark,
                borderBottomWidth: 1,
                paddingBottom: 10,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: theme.colors.common.white,
                  fontFamily: theme.typography.fonts.primary.normal,
                  fontSize: theme.typography.size.regular,
                  flexWrap: "wrap",
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
        <Button
          variant="primary"
          style={{
            backgroundColor: theme.colors.error.main,
          }}
          onPress={() => {
            SignOut();
          }}
        >
          Sair
        </Button>
      </ImageBackground>
    </View>
  );
}
