import type { FlatConfigItem } from '../types.js';
import pluginImportLite from 'eslint-plugin-import-lite';
import { GLOB_VUE, GLOBS_CODE } from '../globs.js';

export function imports(): FlatConfigItem {
	return [{
		name: 'paescuj/imports',
		files: GLOBS_CODE,
		plugins: {
			'import-lite': pluginImportLite,
		},
		rules: {
			// Internal checks, without resolving (left to TypeScript or tests)
			'import-lite/consistent-type-specifier-style': ['error', 'prefer-top-level'],
			'import-lite/first': 'error',
			'import-lite/no-duplicates': 'error',
			'import-lite/no-mutable-exports': 'error',
			'import-lite/no-named-default': 'error',
		},
	},	{
		name: 'paescuj/imports/vue',
		files: [GLOB_VUE],
		rules: {
			// Not enforced until there's a fix available, see https://github.com/vuejs/eslint-plugin-vue/issues/1577
			'import-lite/first': 'off',
		},
	}];
}
