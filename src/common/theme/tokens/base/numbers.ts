type TypographyScale =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10";

type GlobalScale =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"
  | "21"
  | "22"
  | "23"
  | "24"
  | "25";

type EffectsScale =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "full";

interface NumbersBaseTokens {
  effects: Record<EffectsScale, number>;
  globalScale: Record<GlobalScale, number>;
  typography: {
    size: Record<TypographyScale, number>;
    letterSpacing: {
      tight: number;
      default: number;
    };
  };
}

export const numbersBaseTokens = {
  effects: {
    "1": 0.08,
    "2": 0.12,
    "3": 0.16,
    "4": 0.24,
    "5": 0.32,
    "6": 0.4,
    "7": 0.4,
    "8": 0.48,
    "9": 0.64,
    "10": 0.72,
    "11": 0.8,
    "12": 0.96,
    full: 1,
  },
  globalScale: {
    "1": 4,
    "2": 8,
    "3": 12,
    "4": 16,
    "5": 20,
    "6": 24,
    "7": 28,
    "8": 32,
    "9": 36,
    "10": 40,
    "11": 44,
    "12": 48,
    "13": 52,
    "14": 56,
    "15": 60,
    "16": 64,
    "17": 68,
    "18": 72,
    "19": 76,
    "20": 80,
    "21": 84,
    "22": 88,
    "23": 92,
    "24": 96,
    "25": 100,
  },
  typography: {
    size: {
      "1": 11,
      "2": 13,
      "3": 15,
      "4": 17,
      "5": 19,
      "6": 23,
      "7": 29,
      "8": 36,
      "9": 46,
      "10": 57,
    },
    letterSpacing: {
      tight: -0.02,
      default: 0,
    },
  },
} as const satisfies NumbersBaseTokens;
