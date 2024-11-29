import { ESLint } from "eslint";
import prettierPlugin from "eslint-plugin-prettier";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.ts", "**/*.js"], // Apply to TypeScript and JavaScript files
    ignores: ["node_modules/", "dest/", "reviews/"], // Ignore these directories
    languageOptions: {
      parser: tsParser, // Use TypeScript parser
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error", // Enable Prettier integration
      // "no-console": "warn", // Warn on console statements
    },
  },
];
