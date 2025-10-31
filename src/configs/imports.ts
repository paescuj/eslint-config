import type { FlatConfigItem } from '../types.js';
import pluginImportX from 'eslint-plugin-import-x';
import { GLOB_VUE, GLOBS_CODE } from '../globs.js';

export function imports(): FlatConfigItem {
	return [{
		name: 'paescuj/imports',
		files: GLOBS_CODE,
		plugins: {
			'import-x': pluginImportX,
		},
		rules: {
			// Internal checks, without resolving (left to TypeScript or tests)
			'import-x/first': 'error',
			'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
			'import-x/no-duplicates': 'error',
			'import-x/no-mutable-exports': 'error',
			'import-x/no-named-as-default': 'error',
			'import-x/no-self-import': 'error',
		},
	},	{
		name: 'paescuj/imports/vue',
		files: [GLOB_VUE],
		rules: {
			// Not enforced until there's a fix available, see https://github.com/vuejs/eslint-plugin-vue/issues/1577
			'import-x/first': 'off',
		},
	}];
}
