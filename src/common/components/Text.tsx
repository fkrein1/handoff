import {
	Text as RNText,
	TextProps as RNTextProps,
	StyleSheet,
} from "react-native"
import { forwardRef, PropsWithChildren } from "react"

interface TextProps extends RNTextProps {}

export const Text = forwardRef<RNText, PropsWithChildren<TextProps>>(
	function Text(props, ref) {
		return <RNText ref={ref} {...props} />
	}
)
