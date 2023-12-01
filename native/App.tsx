import { ThemeProvider, AuthProvider } from "@contexts";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Menu } from "@screens";
import Navigation from "@src";
import { useFonts } from "expo-font";
import { Keyboard, LogBox, TouchableWithoutFeedback } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
  const [fontLoaded] = useFonts({
    "RedHatDisplay-Regular": require("@assets/fonts/RedHatDisplay-Regular.ttf"),
    "RedHatDisplay-SemiBold": require("@assets/fonts/RedHatDisplay-SemiBold.ttf"),
    "RedHatDisplay-LightItalic": require("@assets/fonts/RedHatDisplay-LightItalic.ttf"),
    "RedHatDisplay-Medium": require("@assets/fonts/RedHatDisplay-Medium.ttf"),
    "RedHatDisplay-Normal": require("@assets/fonts/RedHatDisplay-Regular.ttf"),
  });

  LogBox.ignoreAllLogs();

  if (!fontLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>
          <ThemeProvider>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <Navigation />
              </GestureHandlerRootView>
            </TouchableWithoutFeedback>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}
