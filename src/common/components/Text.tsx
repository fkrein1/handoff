import {
	Text as RNText,
	TextProps as RNTextProps,
	StyleSheet,
} from "react-native"
import { PropsWithChildren } from "react"

export type TextType = "title" | "subtitle" | "default" | "link"

interface TextProps extends RNTextProps {
	type?: TextType
}

export function Text({
	type = "default",
	style,
	children,
	...props
}: PropsWithChildren<TextProps>) {
	const textStyles = [
		styles.default,
		type === "title" && styles.title,
		type === "subtitle" && styles.subtitle,
		type === "link" && styles.link,
		style,
	]

	return (
		<RNText style={textStyles} {...props}>
			{children}
		</RNText>
	)
}

const styles = StyleSheet.create({
	default: {},
	title: {},
	subtitle: {},
	link: {},
})
