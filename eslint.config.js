import { FlatCompat } from "@eslint/eslintrc"
import eslint from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";

const compat = new FlatCompat({
    // import.meta.dirname is available after Node.js v20.11.0
    baseDirectory: import.meta.dirname,
})

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
    {
        files: ["**/*.{ts,tsx}"],
    },
    {
        ignores: [
            "**/next-env.d.ts",
            "**/build/",
            "**/bin/",
            "**/obj/",
            "**/out/",
            "**/.next/",
        ]
    },
    { languageOptions: { globals: globals.browser } },
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat["jsx-runtime"],
    ...compat.config({
        extends: ["next"],
        rules: {
            "@next/next/no-img-element": "off",
        }
    }),
    {
        rules: {
            // Best practices
            "no-debugger": "warn",
            "no-fallthrough": "error",
            "yoda": "warn",
            "eqeqeq": "warn",

            // React
            "react/react-in-jsx-scope": "off",
            "react/jsx-no-leaked-render": "warn",

            // TypeScript
            "@typescript-eslint/no-unused-vars": ["warn", {
                varsIgnorePattern: "^_",
                argsIgnorePattern: "^_",
                caughtErrorsIgnorePattern: "^_",
            }],
            "@typescript-eslint/no-explicit-any": "off",

        },
        settings: { react: { version: "detect" } },
    },
    prettierConfig,
];

export default eslintConfig;
