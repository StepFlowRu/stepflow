import globals from "globals";
import js from "@eslint/js";
import css from "@eslint/css";
import jsdoc from "eslint-plugin-jsdoc";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.{js,mjs,cjs}"],
		plugins: { js, jsdoc },
		extends: ["js/recommended"],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		rules: {
			"no-var": "error",
			"no-shadow": "error",
			"jsdoc/require-jsdoc": [
				"error",
				{
					contexts: ["FunctionDeclaration", "MethodDefinition", "ClassDeclaration", "ArrowFunctionExpression"],
					require: {
						FunctionDeclaration: true,
						MethodDefinition: true,
						ClassDeclaration: true,
						ArrowFunctionExpression: true,
					},
				},
			],
			"jsdoc/check-param-names": "warn",
		},
	},
	{
		files: ["**/*.css"],
		plugins: { css },
		language: "css/css",
		extends: ["css/recommended"],
	},
]);
