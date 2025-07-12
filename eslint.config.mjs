import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const baseConfig = compat.extends("next/core-web-vitals", "next/typescript");

const extendedConfig = baseConfig.map(config => ({
  ...config,
  rules: {
    ...(config.rules || {}),
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
  },
}));

export default extendedConfig;
