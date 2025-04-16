import { defineConfig } from "eslint/config";
import expoConfig from "eslint-config-expo/flat.js";
import gitignore from "eslint-config-flat-gitignore";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import reactCompiler from "eslint-plugin-react-compiler";

export default defineConfig([
  gitignore(),
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ["dist/*"],
    plugins: {
      "react-compiler": reactCompiler,
    },
    rules: {
      "react-compiler/react-compiler": "error",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },
]);
