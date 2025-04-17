import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useDerivedValue,
} from "react-native-reanimated";

import { useThemeScheme } from "@/src/common/hooks/useCurrentThemeScheme";
import { createThemedStyleSheet } from "@/src/common/theme/themedStyles";
import { numbersAliasTokens } from "@/src/common/theme/tokens/alias/numbers";
import { ThemeScheme } from "@/src/common/theme/types";

const SWITCH_WIDTH = 88;
const SWITCH_HEIGHT = 40;
const ICON_SIZE = numbersAliasTokens.sizing.icon.lg;

export const ThemeSwitch = () => {
  const { theme, setTheme } = useThemeScheme();
  const styles = getStyles(theme);

  const isLightTheme = theme === "light";

  const position = useDerivedValue(
    () => (isLightTheme ? 0 : 1),
    [isLightTheme],
  );
  const sunOpacity = useDerivedValue(
    () => (isLightTheme ? 1 : 0.6),
    [isLightTheme],
  );
  const moonOpacity = useDerivedValue(
    () => (isLightTheme ? 0.6 : 1),
    [isLightTheme],
  );

  const toggleTheme = () => {
    setTheme(isLightTheme ? "dark" : "light");
  };

  const highlightStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(position.value * (SWITCH_WIDTH / 2), {
            damping: 15,
            stiffness: 150,
          }),
        },
      ],
    };
  });

  const sunIconStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(sunOpacity.value),
    };
  });

  const moonIconStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(moonOpacity.value),
    };
  });

  return (
    <Pressable onPress={toggleTheme} style={styles.container}>
      <Animated.View style={[styles.highlight, highlightStyle]} />
      <Animated.View style={[styles.iconContainer, sunIconStyle]}>
        <Feather name="sun" size={ICON_SIZE} style={styles.icon} />
      </Animated.View>
      <Animated.View style={[styles.iconContainer, moonIconStyle]}>
        <Feather name="moon" size={ICON_SIZE} style={styles.icon} />
      </Animated.View>
    </Pressable>
  );
};

export const getStyles = (theme: ThemeScheme) =>
  createThemedStyleSheet(theme, ({ colors, numbers }) => ({
    container: {
      borderRadius: numbers.borderRadius.sm,
      backgroundColor: colors.layer.solid.dark,
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      width: SWITCH_WIDTH,
      height: SWITCH_HEIGHT,
      position: "relative",
      overflow: "hidden",
    },
    highlight: {
      backgroundColor: colors.layer.solid.light,
      borderWidth: numbers.outlineHeight.xs,
      borderColor: colors.outline.medium,
      borderRadius: numbers.borderRadius.sm,
      width: SWITCH_WIDTH / 2 - 2,
      height: SWITCH_HEIGHT - 2,
      position: "absolute",
      top: 1,
      left: 1,
      zIndex: 1,
    },
    iconContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2,
    },
    icon: {
      color: colors.icon.secondary,
    },
  }));
