import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  ThemeProvider,
  useThemeScheme,
} from "@/src/common/hooks/useCurrentThemeScheme";
import { getColors } from "@/src/common/theme/tokens/alias/colors";

SplashScreen.preventAutoHideAsync();

function Navigation() {
  const { theme, isReady } = useThemeScheme();
  const colors = getColors(theme);

  useEffect(() => {
    if (isReady) SplashScreen.hide();
  }, [isReady]);

  if (!isReady) return null;

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
