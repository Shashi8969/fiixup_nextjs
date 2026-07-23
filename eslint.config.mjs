import nextConfig from "eslint-config-next";

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...nextConfig,
  {
    ignores: ["graphify-out/**", ".codex/**"],
  },
];

export default config;
