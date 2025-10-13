// @ts-check

/**
 * @type {import("prettier").Config}
 */
const config = {
	arrowParens: "always",
	bracketSameLine: false,
	bracketSpacing: true,
	semi: true,
	experimentalTernaries: false, // por ahora no
	singleQuote: false,
	jsxSingleQuote: false,
	quoteProps: "as-needed",
	trailingComma: "all",
	singleAttributePerLine: false,
	// default - no importa para jsx https://github.com/prettier/prettier/issues/6336#issuecomment-624627193
	htmlWhitespaceSensitivity: "css",
	// default - no hay codigo .vue
	vueIndentScriptAndStyle: false,
	proseWrap: "preserve",
	insertPragma: false,
	requirePragma: false,
	// tabWidth and useTabs will be loaded from .editorconfig
	embeddedLanguageFormatting: "auto", // facil ayuda para @example en docstrings
	printWidth: 100,
	plugins: ["prettier-plugin-organize-imports"],
};

export default config;
