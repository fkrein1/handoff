import {
	Text as RNText,
	TextProps as RNTextProps,
	StyleSheet,
} from "react-native"
import { PropsWithChildren } from "react"

interface TextProps extends RNTextProps {}

export function Text(props: PropsWithChildren<TextProps>) {
	return <RNText {...props} />
}
