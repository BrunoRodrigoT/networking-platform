import { ThemeProvider } from "@contexts";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "@src";
import { useFonts } from "expo-font";
import { Keyboard, LogBox, TouchableWithoutFeedback } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [fontLoaded] = useFonts({
    "OpenSans-Regular": require("@assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-SemiBold": require("@assets/fonts/OpenSans-SemiBold.ttf"),
    "OpenSans-LightItalic": require("@assets/fonts/OpenSans-LightItalic.ttf"),
    "Montserrat-Medium": require("@assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Normal": require("@assets/fonts/Montserrat-Regular.ttf"),
    "Nico-moji-Regular": require("@assets/fonts/NicoMoji-Regular.ttf"),
  });

  LogBox.ignoreAllLogs();

  if (!fontLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <ThemeProvider>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Navigation />
          </GestureHandlerRootView>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    </NavigationContainer>
  );
}
