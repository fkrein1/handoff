import { Pressable, StyleSheet, PressableProps } from "react-native"
import { Text } from "./Text"
import { PropsWithChildren, useState } from "react"

interface ButtonProps extends PressableProps {
	variant?: "primary" | "secondary"
}

export function Button({
	variant = "primary",
	style,
	disabled,
	children,
	...props
}: PropsWithChildren<ButtonProps>) {
	const [hovered, setHovered] = useState(false)

	return (
		<Pressable
			style={[
				styles.button,
				disabled && styles.disabled,
				hovered && styles.hovered,
				style,
			]}
			disabled={disabled}
			onHoverIn={() => setHovered(true)}
			onHoverOut={() => setHovered(false)}
			{...props}
		>
			<Text style={styles.text}>{children}</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "blue",
	},
	disabled: {},
	text: {},
	hovered: {},
})
