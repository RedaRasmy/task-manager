// Run this command to generate base config and vs code settings:
// pnpm dlx @antfu/eslint-config@latest

import antfu from "@antfu/eslint-config"

export default antfu(
    {
        type: "app",
        typescript: true,
        formatters: true,
        react: true,
        stylistic: {
            indent: 4,
            semi: false,
            quotes: "double",
        },
    },
    {
        rules: {
            "ts/no-redeclare": "off",
            "ts/consistent-type-definitions": ["error", "type"],
            "no-console": ["warn"],
            "antfu/no-top-level-await": ["off"],
            "node/prefer-global/process": ["off"],
            "node/no-process-env": ["error"],
            "perfectionist/sort-imports": [
                "error",
                {
                    tsconfigRootDir: ".",
                },
            ],
            "unicorn/filename-case": [
                "error",
                {
                    case: "kebabCase",
                    ignore: ["README.md"],
                },
            ],
        },
    },
)
