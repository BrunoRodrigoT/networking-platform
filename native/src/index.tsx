import React from "react";
import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IRootStackParamList } from "@models/Screens";
import { Menu, CheckOvertime, SignIn, SignUp } from "@screens";

const Stack = createNativeStackNavigator<IRootStackParamList>();

export default function Navigation() {
  return (
    <Stack.Navigator initialRouteName="SIGN_IN">
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
    </Stack.Navigator>
  );
}
