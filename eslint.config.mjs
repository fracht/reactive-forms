import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "**/build/",
        "**/dist/",
        "**/node_modules/",
        "**/.snapshots/",
        "**/*.min.js",
        "**/*.config.js",
        "**/dangerfile.js",
    ],
}, ...compat.extends("@reactive-tools/eslint-config")];