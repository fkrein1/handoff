import { alphaHexValues } from '@/src/common/lib/colors';

function isNil(value: unknown): value is null | undefined {
	return value === null || value === undefined;
}

type BaseScale =
	| '10'
	| '20'
	| '30'
	| '40'
	| '50'
	| '60'
	| '70'
	| '80'
	| '90'
	| '100'
	| '200'
	| '300'
	| '400'
	| '500'
	| '600'
	| '700'
	| '800'
	| '900'

type ColorScale = Extract<
	BaseScale,
	| '10'
	| '50'
	| '100'
	| '200'
	| '300'
	| '400'
	| '500'
	| '600'
	| '700'
	| '800'
	| '900'
>

type NeutralColorScale = Extract<
	BaseScale,
	| '10'
	| '50'
	| '100'
	| '200'
	| '300'
	| '400'
	| '500'
	| '600'
	| '700'
	| '800'
	| '900'
>

type AlphaScale = Extract<BaseScale, '10' | '20' | '30' | '40' | '50' | '60'>

type NeutralAlphaScale = Extract<
	BaseScale,
	'10' | '20' | '30' | '40' | '50' | '60' | '70' | '80' | '90'
>

type ColorPalette = Record<ColorScale, string>
type NeutralColorPalette = Record<NeutralColorScale, string>

interface SolidColors {
	brand: ColorPalette
	neutral: NeutralColorPalette
	attention: ColorPalette
	negative: ColorPalette
	blue: ColorPalette
	blueLight: ColorPalette
	blueGray: ColorPalette
	purple: ColorPalette
	pink: ColorPalette
	orange: ColorPalette
	positive: ColorPalette
}

type AlphaColorSet = Record<AlphaScale, string>
type NeutralAlphaColorSet = Record<NeutralAlphaScale, string>
interface AlphaColors {
	neutral: {
		900: NeutralAlphaColorSet
		400: NeutralAlphaColorSet
		10: NeutralAlphaColorSet
	}
	brand: {
		500: AlphaColorSet
		200: AlphaColorSet
	}
	attention: {
		500: AlphaColorSet
		200: AlphaColorSet
	}
	negative: {
		500: AlphaColorSet
		200: AlphaColorSet
	}
	blue: {
		500: AlphaColorSet
		200: AlphaColorSet
	}
	positive: {
		500: AlphaColorSet
		200: AlphaColorSet
	}
}

interface ColorsBaseTokens {
	solid: SolidColors
	alpha: AlphaColors
}

const alphaFromScale: Record<AlphaScale, string | undefined> = {
	'10': alphaHexValues['8%'],
	'20': alphaHexValues['16%'],
	'30': alphaHexValues['24%'],
	'40': alphaHexValues['32%'],
	'50': alphaHexValues['48%'],
	'60': alphaHexValues['64%'],
};

const alphaFromNeutralScale: Record<NeutralAlphaScale, string | undefined> = {
	'10': alphaHexValues['8%'],
	'20': alphaHexValues['12%'],
	'30': alphaHexValues['16%'],
	'40': alphaHexValues['24%'],
	'50': alphaHexValues['32%'],
	'60': alphaHexValues['48%'],
	'70': alphaHexValues['64%'],
	'80': alphaHexValues['72%'],
	'90': alphaHexValues['80%'],
};

function getColorWithAlphaScale(color: string, scale: AlphaScale) {
	const alpha = alphaFromScale[scale];
	return !isNil(alpha) ? `${color}${alpha}` : color;
}

function getNeutralColorWithAlphaScale(
	color: string,
	scale: NeutralAlphaScale
) {
	const alpha = alphaFromNeutralScale[scale];
	return !isNil(alpha) ? `${color}${alpha}` : color;
}

const solid = {
	brand: {
		900: '#002c17',
		800: '#004825',
		700: '#006434',
		600: '#008042',
		500: '#009c51',
		400: '#09b262',
		300: '#61c293',
		200: '#91d4b4',
		100: '#c2e7d5',
		50: '#edf7f2',
		10: '#f5faff',
	},
	neutral: {
		900: '#0a0c0e',
		800: '#222529',
		700: '#32373d',
		600: '#454a52',
		500: '#70767f',
		400: '#959ba5',
		300: '#b9c0c9',
		200: '#dce1e8',
		100: '#e8ecf2',
		50: '#f5f6fa',
		10: '#ffffff',
	},
	attention: {
		900: '#7a2e0e',
		800: '#93370d',
		700: '#b54708',
		600: '#dc6803',
		500: '#f79009',
		400: '#fdb022',
		300: '#fec84b',
		200: '#fedf89',
		100: '#fef0c7',
		50: '#fffaeb',
		10: '#fffcf5',
	},
	negative: {
		900: '#89123e',
		800: '#a11043',
		700: '#c01048',
		600: '#e31b54',
		500: '#f63d68',
		400: '#fd6f8e',
		300: '#fea3b4',
		200: '#fecdd6',
		100: '#ffe4e8',
		50: '#fff1f3',
		10: '#fff5f6',
	},
	blue: {
		900: '#194185',
		800: '#1849a9',
		700: '#175cd3',
		600: '#1570ef',
		500: '#2e90fa',
		400: '#53b1fd',
		300: '#84caff',
		200: '#b2ddff',
		100: '#d1e9ff',
		50: '#eff8ff',
		10: '#f5faff',
	},
	blueLight: {
		900: '#0b4a6f',
		800: '#065986',
		700: '#026aa2',
		600: '#0086c9',
		500: '#0ba5ec',
		400: '#36bffa',
		300: '#7cd4fd',
		200: '#b9e6fe',
		100: '#e0f2fe',
		50: '#f0f9ff',
		10: '#f5fbff',
	},
	blueGray: {
		900: '#101323',
		800: '#293056',
		700: '#363f72',
		600: '#3e4784',
		500: '#4e5ba6',
		400: '#717bbc',
		300: '#afb5d9',
		200: '#d5d9eb',
		100: '#eaecf5',
		50: '#f8f9fc',
		10: '#fcfcfd',
	},
	purple: {
		900: '#3e1c96',
		800: '#4a1fb8',
		700: '#5925dc',
		600: '#6938ef',
		500: '#7a5af8',
		400: '#9b8afb',
		300: '#bdb4fe',
		200: '#d9d6fe',
		100: '#ebe9fe',
		50: '#f4f3ff',
		10: '#fafaff',
	},
	pink: {
		900: '#851651',
		800: '#9e165f',
		700: '#c11574',
		600: '#dd2590',
		500: '#ee46bc',
		400: '#f670c7',
		300: '#faa7e0',
		200: '#fcceee',
		100: '#fce7f6',
		50: '#fdf2fa',
		10: '#fef6fb',
	},
	orange: {
		900: '#7e2410',
		800: '#9c2a10',
		700: '#c4320a',
		600: '#ec4a0a',
		500: '#fb6514',
		400: '#fd853a',
		300: '#feb273',
		200: '#fddcab',
		100: '#ffead5',
		50: '#fff6ed',
		10: '#fffaf5',
	},
	positive: {
		900: '#054f31',
		800: '#18600a',
		700: '#2a7a02',
		600: '#359803',
		500: '#49b712',
		400: '#63cc2f',
		300: '#96e96c',
		200: '#c0f4a6',
		100: '#dffad1',
		50: '#f2fdec',
		10: '#f8fef6',
	},
} as const satisfies SolidColors;

const alpha = {
	neutral: {
		900: {
			'90': getNeutralColorWithAlphaScale(solid.neutral['900'], '90'),
			'80': getNeutralColorWithAlphaScale(solid.neutral['900'], '80'),
			'70': getNeutralColorWithAlphaScale(solid.neutral['900'], '70'),
			'60': getNeutralColorWithAlphaScale(solid.neutral['900'], '60'),
			'50': getNeutralColorWithAlphaScale(solid.neutral['900'], '50'),
			'40': getNeutralColorWithAlphaScale(solid.neutral['900'], '40'),
			'30': getNeutralColorWithAlphaScale(solid.neutral['900'], '30'),
			'20': getNeutralColorWithAlphaScale(solid.neutral['900'], '20'),
			'10': getNeutralColorWithAlphaScale(solid.neutral['900'], '10'),
		},
		400: {
			'90': getNeutralColorWithAlphaScale(solid.neutral['400'], '90'),
			'80': getNeutralColorWithAlphaScale(solid.neutral['400'], '80'),
			'70': getNeutralColorWithAlphaScale(solid.neutral['400'], '70'),
			'60': getNeutralColorWithAlphaScale(solid.neutral['400'], '60'),
			'50': getNeutralColorWithAlphaScale(solid.neutral['400'], '50'),
			'40': getNeutralColorWithAlphaScale(solid.neutral['400'], '40'),
			'30': getNeutralColorWithAlphaScale(solid.neutral['400'], '30'),
			'20': getNeutralColorWithAlphaScale(solid.neutral['400'], '20'),
			'10': getNeutralColorWithAlphaScale(solid.neutral['400'], '10'),
		},
		10: {
			'90': getNeutralColorWithAlphaScale(solid.neutral['10'], '90'),
			'80': getNeutralColorWithAlphaScale(solid.neutral['10'], '80'),
			'70': getNeutralColorWithAlphaScale(solid.neutral['10'], '70'),
			'60': getNeutralColorWithAlphaScale(solid.neutral['10'], '60'),
			'50': getNeutralColorWithAlphaScale(solid.neutral['10'], '50'),
			'40': getNeutralColorWithAlphaScale(solid.neutral['10'], '40'),
			'30': getNeutralColorWithAlphaScale(solid.neutral['10'], '30'),
			'20': getNeutralColorWithAlphaScale(solid.neutral['10'], '20'),
			'10': getNeutralColorWithAlphaScale(solid.neutral['10'], '10'),
		},
	},
	brand: {
		500: {
			'60': getColorWithAlphaScale(solid.brand['500'], '60'),
			'50': getColorWithAlphaScale(solid.brand['500'], '50'),
			'40': getColorWithAlphaScale(solid.brand['500'], '40'),
			'30': getColorWithAlphaScale(solid.brand['500'], '30'),
			'20': getColorWithAlphaScale(solid.brand['500'], '20'),
			'10': getColorWithAlphaScale(solid.brand['500'], '10'),
		},
		200: {
			'60': getColorWithAlphaScale(solid.brand['200'], '60'),
			'50': getColorWithAlphaScale(solid.brand['200'], '50'),
			'40': getColorWithAlphaScale(solid.brand['200'], '40'),
			'30': getColorWithAlphaScale(solid.brand['200'], '30'),
			'20': getColorWithAlphaScale(solid.brand['200'], '20'),
			'10': getColorWithAlphaScale(solid.brand['200'], '10'),
		},
	},
	attention: {
		500: {
			'60': getColorWithAlphaScale(solid.attention['500'], '60'),
			'50': getColorWithAlphaScale(solid.attention['500'], '50'),
			'40': getColorWithAlphaScale(solid.attention['500'], '40'),
			'30': getColorWithAlphaScale(solid.attention['500'], '30'),
			'20': getColorWithAlphaScale(solid.attention['500'], '20'),
			'10': getColorWithAlphaScale(solid.attention['500'], '10'),
		},
		200: {
			'60': getColorWithAlphaScale(solid.attention['200'], '60'),
			'50': getColorWithAlphaScale(solid.attention['200'], '50'),
			'40': getColorWithAlphaScale(solid.attention['200'], '40'),
			'30': getColorWithAlphaScale(solid.attention['200'], '30'),
			'20': getColorWithAlphaScale(solid.attention['200'], '20'),
			'10': getColorWithAlphaScale(solid.attention['200'], '10'),
		},
	},
	negative: {
		500: {
			'60': getColorWithAlphaScale(solid.negative['500'], '60'),
			'50': getColorWithAlphaScale(solid.negative['500'], '50'),
			'40': getColorWithAlphaScale(solid.negative['500'], '40'),
			'30': getColorWithAlphaScale(solid.negative['500'], '30'),
			'20': getColorWithAlphaScale(solid.negative['500'], '20'),
			'10': getColorWithAlphaScale(solid.negative['500'], '10'),
		},
		200: {
			'60': getColorWithAlphaScale(solid.negative['200'], '60'),
			'50': getColorWithAlphaScale(solid.negative['200'], '50'),
			'40': getColorWithAlphaScale(solid.negative['200'], '40'),
			'30': getColorWithAlphaScale(solid.negative['200'], '30'),
			'20': getColorWithAlphaScale(solid.negative['200'], '20'),
			'10': getColorWithAlphaScale(solid.negative['200'], '10'),
		},
	},
	blue: {
		500: {
			'60': getColorWithAlphaScale(solid.blue['500'], '60'),
			'50': getColorWithAlphaScale(solid.blue['500'], '50'),
			'40': getColorWithAlphaScale(solid.blue['500'], '40'),
			'30': getColorWithAlphaScale(solid.blue['500'], '30'),
			'20': getColorWithAlphaScale(solid.blue['500'], '20'),
			'10': getColorWithAlphaScale(solid.blue['500'], '10'),
		},
		200: {
			'60': getColorWithAlphaScale(solid.blue['200'], '60'),
			'50': getColorWithAlphaScale(solid.blue['200'], '50'),
			'40': getColorWithAlphaScale(solid.blue['200'], '40'),
			'30': getColorWithAlphaScale(solid.blue['200'], '30'),
			'20': getColorWithAlphaScale(solid.blue['200'], '20'),
			'10': getColorWithAlphaScale(solid.blue['200'], '10'),
		},
	},
	positive: {
		500: {
			'60': getColorWithAlphaScale(solid.positive['500'], '60'),
			'50': getColorWithAlphaScale(solid.positive['500'], '50'),
			'40': getColorWithAlphaScale(solid.positive['500'], '40'),
			'30': getColorWithAlphaScale(solid.positive['500'], '30'),
			'20': getColorWithAlphaScale(solid.positive['500'], '20'),
			'10': getColorWithAlphaScale(solid.positive['500'], '10'),
		},
		200: {
			'60': getColorWithAlphaScale(solid.positive['200'], '60'),
			'50': getColorWithAlphaScale(solid.positive['200'], '50'),
			'40': getColorWithAlphaScale(solid.positive['200'], '40'),
			'30': getColorWithAlphaScale(solid.positive['200'], '30'),
			'20': getColorWithAlphaScale(solid.positive['200'], '20'),
			'10': getColorWithAlphaScale(solid.positive['200'], '10'),
		},
	},
} as const satisfies AlphaColors;

export const colorsBaseTokens = {
	solid,
	alpha,
} as const satisfies ColorsBaseTokens;
