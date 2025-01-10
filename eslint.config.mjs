import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn", // Change to "off" to completely disable or "warn" for warnings
        {
          argsIgnorePattern: "^_", // Ignore arguments starting with "_"
          varsIgnorePattern: "^_", // Ignore variables starting with "_"
        },
      ],
    },
  },
];

export default eslintConfig;
