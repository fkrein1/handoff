import { forwardRef, PropsWithChildren, useState } from "react";
import { Pressable, PressableProps, View } from "react-native";

import { useThemeScheme } from "../hooks/useCurrentThemeScheme";
import { createThemedStyleSheet } from "../theme/themedStyles";
import { ThemeScheme } from "../theme/types";

import { Text } from "./Text";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends PressableProps {
  variant?: ButtonVariant;
}

export const Button = forwardRef<View, PropsWithChildren<ButtonProps>>(
  function Button(
    { variant = "primary", style, disabled, children, ...props },
    ref,
  ) {
    const [hovered, setHovered] = useState(false);
    const { theme } = useThemeScheme();
    const styles = getStyles(theme, variant);

    return (
      <Pressable
        ref={ref}
        style={[
          styles.button,
          disabled && styles.disabled,
          hovered && styles.hovered,
          typeof style !== "function" && style,
        ]}
        disabled={disabled}
        onHoverIn={() => setHovered(true)}
        onHoverOut={() => setHovered(false)}
        {...props}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    );
  },
);

const getStyles = (theme: ThemeScheme, variant: ButtonVariant) =>
  createThemedStyleSheet(theme, ({ colors, numbers, fonts, tokens }) => ({
    button: {
      borderRadius: tokens.button.borderRadius,
      backgroundColor: tokens.button.background[variant].idle,
      padding: numbers.spacing["xs"],
    },
    disabled: {
      backgroundColor: tokens.button.background[variant].idle,
    },
    text: {
      ...fonts.regular.text.md,
      textAlign: "center",
      color: variant === "primary" ? colors.text.white : colors.text.primary,
    },
    hovered: {
      backgroundColor: tokens.button.background[variant].hover,
    },
  }));
