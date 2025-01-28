import { useMemo, useState } from "react"
import { useColorScheme } from "react-native"
import { ThemeScheme } from "../theme/types"

const DEFAULT_THEME_SCHEME = "light"

interface UseCurrentThemeSchemePayload {
	value: ThemeScheme
	setValue: (value: ThemeScheme) => void
}

interface UseCurrentThemeSchemeProps {
	preferSystem?: boolean
}

export function useCurrentThemeScheme(
	props?: UseCurrentThemeSchemeProps
): UseCurrentThemeSchemePayload {
	const deviceThemeScheme = useColorScheme()

	const [themeScheme, setThemeScheme] =
		useState<ThemeScheme>(DEFAULT_THEME_SCHEME)

	return useMemo(() => {
		const systemThemeScheme = deviceThemeScheme ?? DEFAULT_THEME_SCHEME

		const value =
			props?.preferSystem === true ? systemThemeScheme : themeScheme

		return {
			value,
			setValue: setThemeScheme,
		}
	}, [deviceThemeScheme, props?.preferSystem, setThemeScheme, themeScheme])
}
