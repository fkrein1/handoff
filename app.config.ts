import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "Handoff",
  slug: "Handoff",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "handoff",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    bundleIdentifier: "com.felipekrein.handoff",
    supportsTablet: true,
  },
  android: {
    package: "com.felipekrein.handoff",
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#000000",
    },
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    "expo-dev-client",
    "expo-web-browser",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#000000",
      },
    ],
    [
      "expo-font",
      {
        fonts: [
          "node_modules/@expo-google-fonts/inter/Inter_400Regular.ttf",
          "node_modules/@expo-google-fonts/inter/Inter_500Medium.ttf",
          "node_modules/@expo-google-fonts/inter/Inter_600SemiBold.ttf",
          "node_modules/@expo-google-fonts/poppins/Poppins_400Regular.ttf",
          "node_modules/@expo-google-fonts/poppins/Poppins_600SemiBold.ttf",
        ],
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    eas: {
      projectId: "1e7f8026-f4e8-4f40-b16f-74078f426859",
    },
  },
};

export default config;
