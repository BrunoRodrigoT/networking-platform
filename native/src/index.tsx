import React from "react";
import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IRootStackParamList } from "@models/Screens";
import { Menu, CheckOvertime, SignIn, SignUp } from "@screens";
import { AuthContext } from "./contexts/AuthContext";

const Stack = createNativeStackNavigator<IRootStackParamList>();

export default function Navigation() {
  const { state } = React.useContext(AuthContext);

  return (
    <Stack.Navigator initialRouteName="MENU">
      {state.data.token ? (
        <>
          <Stack.Screen
            name="MENU"
            component={Menu}
            options={{ header: () => <></> }}
          />
          <Stack.Screen
            name="CHECK_OVERTIME"
            component={CheckOvertime}
            options={{ header: () => <></> }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="SIGN_IN"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SIGN_UP"
            component={SignUp}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
