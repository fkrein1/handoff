import { forwardRef, PropsWithChildren, useState } from 'react';
import { Pressable, StyleSheet, PressableProps, View } from 'react-native';

import { Text } from './Text';

interface ButtonProps extends PressableProps {
	variant?: 'primary' | 'secondary'
}

export const Button = forwardRef<View, PropsWithChildren<ButtonProps>>(
	function Button(
		{ variant = 'primary', style, disabled, children, ...props },
		ref
	) {
		const [hovered, setHovered] = useState(false);

		return (
			<Pressable
				ref={ref}
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
		);
	}
);

const styles = StyleSheet.create({
	button: {},
	disabled: {},
	text: {},
	hovered: {},
});
