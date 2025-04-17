import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  ThemeProvider,
  useThemeScheme,
} from "@/src/common/hooks/useCurrentThemeScheme";
import { useFonts } from "@/src/common/theme/fonts";
import { getColors } from "@/src/common/theme/tokens/alias/colors";

SplashScreen.preventAutoHideAsync();

function Navigation() {
  const { theme, isReady: isThemeReady } = useThemeScheme();
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
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.layer.solid.medium }}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
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
