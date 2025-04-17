import BottomSheetComponent, {
  BottomSheetProps,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";
import { TextInput } from "react-native-gesture-handler";

import { useThemeScheme } from "../hooks/useCurrentThemeScheme";

export type BottomSheet = BottomSheetComponent;

export const BottomSheet = forwardRef<BottomSheetComponent, BottomSheetProps>(
  function BottomSheet(props, ref) {
    return <BottomSheetComponent ref={ref} {...props} />;
  },
);

export const BottomSheetTextField = forwardRef<
  TextInput,
  React.ComponentProps<typeof BottomSheetTextInput>
>(function BottomSheetTextField(props, ref) {
  const { theme } = useThemeScheme();

  return (
    <BottomSheetTextInput ref={ref} {...props} keyboardAppearance={theme} />
  );
});
