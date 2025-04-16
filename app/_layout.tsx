import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  ThemeProvider,
  useThemeScheme,
} from "@/src/common/hooks/useCurrentThemeScheme";
import { getColors } from "@/src/common/theme/tokens/alias/colors";

SplashScreen.preventAutoHideAsync();

function Navigation() {
  const theme = useThemeScheme();
  const colors = getColors(theme.value);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.layer.solid.medium }}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}

export default function RootLayout() {
  const onLayoutRootView = () => SplashScreen.hide();

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
