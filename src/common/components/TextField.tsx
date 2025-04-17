import { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";

import { useThemeScheme } from "../hooks/useCurrentThemeScheme";

export const TextField = forwardRef<TextInput, TextInputProps>(
  function TextField(props, ref) {
    const { theme } = useThemeScheme();

    return <TextInput ref={ref} {...props} keyboardAppearance={theme} />;
  },
);
