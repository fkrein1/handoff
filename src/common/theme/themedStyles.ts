import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";

import { CustomFonts, customFonts } from "./fonts";
import { ColorMode, getColors } from "./tokens/alias/colors";
import { NumbersAliasTokens, numbersAliasTokens } from "./tokens/alias/numbers";
import { ThemeScheme } from "./types";

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

const themeTokensCache = new Map<
  ThemeScheme,
  {
    colors: ColorMode;
    numbers: NumbersAliasTokens;
    fonts: CustomFonts;
  }
>();

function getThemeTokens(theme: ThemeScheme) {
  if (!themeTokensCache.has(theme)) {
    themeTokensCache.set(theme, {
      colors: getColors(theme),
      numbers: numbersAliasTokens,
      fonts: customFonts,
    });
  }
  return themeTokensCache.get(theme)!;
}

const styleSheetCache = new WeakMap<Function, Map<ThemeScheme, any>>();

export function createThemedStyleSheet<T extends NamedStyles<T>>(
  theme: ThemeScheme,
  styles: (tokens: {
    colors: ColorMode;
    numbers: NumbersAliasTokens;
    fonts: CustomFonts;
  }) => T,
): T {
  let themeMap = styleSheetCache.get(styles);
  if (!themeMap) {
    themeMap = new Map();
    styleSheetCache.set(styles, themeMap);
  }
  if (!themeMap.has(theme)) {
    const tokens = getThemeTokens(theme);
    themeMap.set(theme, StyleSheet.create(styles(tokens)));
  }
  return themeMap.get(theme)!;
}
