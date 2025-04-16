import { forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface TextFieldProps extends TextInputProps {}

export const TextField = forwardRef<TextInput, TextFieldProps>(function (
	props,
	ref
) {
	return <TextInput ref={ref} {...props} />;
});
