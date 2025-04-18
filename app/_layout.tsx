import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  ThemeProvider,
  useThemeScheme,
} from "@/src/common/hooks/useCurrentThemeScheme";
import { useFonts } from "@/src/common/theme/fonts";
import { getColors } from "@/src/common/theme/tokens/alias/colors";

SplashScreen.preventAutoHideAsync();

function Navigation() {
  const insets = useSafeAreaInsets();
  const { theme, isReady: isThemeReady } = useThemeScheme();
  const systemBarTheme = theme === "dark" ? "light" : "dark";
  const colors = getColors(theme);
  const [fontsLoaded, fontsError] = useFonts();

  const appReady = isThemeReady && (fontsLoaded || fontsError);

  useEffect(() => {
    if (appReady) {
      SplashScreen.hide();
    }
  }, [appReady]);

  if (!appReady) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: colors.layer.solid.medium,
      }}
    >
      <SystemBars style={systemBarTheme} />
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
