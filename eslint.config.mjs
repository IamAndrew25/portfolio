import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/modules/*/{domain,application}/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", {
        patterns: [{
          group: ["react", "react/*", "next", "next/*", "@/app/*", "@/content/*", "**/infrastructure/*", "**/presentation/*"],
          message: "Domain and application depend on contracts, not frameworks, content or adapters.",
        }],
      }],
    },
  },
  {
    files: ["src/modules/*/presentation/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", {
        patterns: [{
          group: ["@/content/*", "**/infrastructure/*", "@/app/*"],
          message: "Presentation receives data through props; composition belongs in app/.",
        }],
      }],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "test-results/**",
    "playwright-report/**",
  ]),
]);

export default eslintConfig;
