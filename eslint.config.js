import playwright from "eslint-plugin-playwright";
import eslint from "@typescript-eslint/eslint-plugin";

export default [
  playwright.configs["flat/recommended"],
  {
    rules: {
        semi: "error",
        "prefer-const": "error"
    },
    files: ["**/*.ts"],
    plugins: {
      "@typescript-eslint": eslint
    }
  }
];