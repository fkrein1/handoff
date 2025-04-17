import React from "react";
import { View, Text } from "react-native";

import { useThemeScheme } from "@/src/common/hooks/useCurrentThemeScheme";
import { createThemedStyleSheet } from "@/src/common/theme/themedStyles";
import { ThemeScheme } from "@/src/common/theme/types";

export function Draft() {
  const { theme } = useThemeScheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <Text style={styles.text}>Draft</Text>
    </View>
  );
}

const getStyles = (theme: ThemeScheme) =>
  createThemedStyleSheet(theme, ({ colors, numbers, fonts }) => ({
    container: {
      flexDirection: "row",
      borderColor: colors.outline.dark,
      borderWidth: numbers.outlineHeight.xs,
      borderRadius: numbers.borderRadius.pill,
      alignSelf: "flex-start",
      alignItems: "center",
      gap: numbers.spacing["3xs"],
      paddingInline: numbers.spacing["2xs"],
    },
    circle: {
      width: 6,
      height: 6,
      borderRadius: numbers.borderRadius.pill,
      backgroundColor: colors.outline.dark,
    },
    text: {
      ...fonts.regular.text.sm,
      color: colors.text.secondary,
    },
  }));
