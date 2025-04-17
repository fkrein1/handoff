import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";

import { CustomFonts, customFonts } from "./fonts";
import { ColorMode, getColors } from "./tokens/alias/colors";
import { numbersAliasTokens } from "./tokens/alias/numbers";
import {
  ColorMode as ColorModeToken,
  getComponentTokens,
} from "./tokens/components";
import { ThemeScheme } from "./types";

type StyleProps = ViewStyle | TextStyle | ImageStyle;
type NamedStyles<T> = { [P in keyof T]: StyleProps };

const themeTokensCache = new Map<
  ThemeScheme,
  {
    colors: ColorMode;
    numbers: typeof numbersAliasTokens;
    fonts: CustomFonts;
    tokens: ColorModeToken;
  }
>();

function getThemeTokens(theme: ThemeScheme) {
  if (!themeTokensCache.has(theme)) {
    themeTokensCache.set(theme, {
      colors: getColors(theme),
      numbers: numbersAliasTokens,
      fonts: customFonts,
      tokens: getComponentTokens(theme),
    });
  }
  return themeTokensCache.get(theme)!;
}

type ThemeTokens = {
  colors: ColorMode;
  numbers: typeof numbersAliasTokens;
  fonts: CustomFonts;
  tokens: ColorModeToken;
};

const styleSheetCache = new WeakMap<Function, Map<ThemeScheme, any>>();

export function createThemedStyleSheet<
  T extends NamedStyles<T> | NamedStyles<any>,
>(theme: ThemeScheme, stylesFn: (tokens: ThemeTokens) => T): T {
  let themeMap = styleSheetCache.get(stylesFn);
  if (!themeMap) {
    themeMap = new Map();
    styleSheetCache.set(stylesFn, themeMap);
  }
  if (!themeMap.has(theme)) {
    const tokens = getThemeTokens(theme);
    themeMap.set(theme, StyleSheet.create(stylesFn(tokens)));
  }
  return themeMap.get(theme);
}
