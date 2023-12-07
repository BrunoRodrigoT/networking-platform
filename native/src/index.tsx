import React from "react";
import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IRootStackParamList } from "@models/Screens";
import {
  Menu,
  Profile,
  SignIn,
  SignUp,
  Publication,
  Favorites,
  MyPublications,
} from "@screens";
import { AuthContext } from "./contexts/AuthContext";
import Logo from "@assets/icons/svgs/icons/logo.svg";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "./contexts/themeContext";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SwipeBar from "./components/SwipeBar";

const Stack = createDrawerNavigator<IRootStackParamList>();

export default function Navigation() {
  const { state } = React.useContext(AuthContext);
  const theme = useTheme();

  return (
    <Stack.Navigator initialRouteName="MENU" drawerContent={() => <SwipeBar />}>
      {state.data.token ? (
        <>
          <Stack.Screen
            name="MENU"
            component={Menu}
            options={{
              drawerLabel: "Página Inicial",
              header: () => (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 19,
                    backgroundColor: theme.colors.background.main,
                  }}
                >
                  <Logo width={220} />
                </View>
              ),
            }}
          />
          <Stack.Screen
            name="PROFILE"
            component={Profile}
            options={{
              drawerLabel: "Perfil",
              header: () => <></>,
            }}
          />
          <Stack.Screen
            name="PUBLICATION_FORM"
            component={Publication}
            options={{
              drawerLabel: "Postagens",
              header: () => <></>,
            }}
          />
          <Stack.Screen
            name="FAVORITES"
            component={Favorites}
            options={{
              drawerLabel: "Postagens",
              header: () => <></>,
            }}
          />
          <Stack.Screen
            name="MY_PUBLICATIONS"
            component={MyPublications}
            options={{
              drawerLabel: "Postagens",
              header: () => <></>,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="SIGN_IN"
            component={SignIn}
            options={{ headerShown: false, swipeEnabled: false }}
          />
          <Stack.Screen
            name="SIGN_UP"
            component={SignUp}
            options={{ headerShown: false, swipeEnabled: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
