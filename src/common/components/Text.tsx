import { forwardRef, PropsWithChildren } from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";

export const Text = forwardRef<RNText, PropsWithChildren<RNTextProps>>(
  function Text(props, ref) {
    return <RNText ref={ref} {...props} />;
  },
);
