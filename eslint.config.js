import { fileURLToPath } from "node:url";
import path from "node:path";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import storybook from "eslint-plugin-storybook";
import tailwind from "eslint-plugin-tailwindcss";
import prettier from "eslint-config-prettier";
import globals from "globals";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "storybook-static/**",
      "coverage/**",
      "node_modules/**",
      "src/__generated__/**",
      "components.json",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      tailwindcss: tailwind,
    },
    settings: {
      react: { version: "detect" },
      tailwindcss: {
        config: path.join(__dirname, "src/styles/globals.css"),
        callees: ["cn", "cva", "cx", "clsx", "twMerge"],
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      "tailwindcss/no-custom-classname": "error",
      "tailwindcss/classnames-order": "off",
      "react/prop-types": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "CallExpression[callee.type='MemberExpression'][callee.property.name='join'][arguments.0.value=' ']",
          message:
            "Use cn() from @/utils/cn instead of Array.join(' ') for class strings — keeps Tailwind IntelliSense and tailwind-merge.",
        },
        {
          selector:
            "JSXAttribute[name.name='className'] > JSXExpressionContainer > TemplateLiteral[expressions.length>0]",
          message: "Use cn() instead of template literals with interpolation in className.",
        },
        {
          selector:
            "JSXAttribute[name.name='className'] > JSXExpressionContainer > BinaryExpression",
          message: "Use cn() instead of string concatenation in className.",
        },
      ],
    },
  },
  {
    files: ["**/*.stories.@(ts|tsx|js|jsx)"],
    plugins: { storybook },
    rules: {
      ...storybook.configs.recommended.rules,
      "react-hooks/rules-of-hooks": "off",
    },
  },
  {
    files: ["**/*.test.@(ts|tsx)", "**/*.stories.@(ts|tsx)"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    files: ["scripts/**/*.{ts,mts,cts}", "*.config.{ts,mts,cts,js,mjs}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  prettier,
);
