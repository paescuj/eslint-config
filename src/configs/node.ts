import type { FlatConfigItem } from '../types.js';
import pluginN from 'eslint-plugin-n';
import { GLOB_JS_TS } from '../globs.js';

export function node(): FlatConfigItem {
	return {
		name: 'paescuj/node',
		files: [GLOB_JS_TS],
		plugins: {
			n: pluginN,
		},
		rules: {
			// Rules borrowed from https://github.com/antfu/eslint-config
			// (mininal for now to not conflict with browser)
			'n/handle-callback-err': ['error', '^(err|error)$'],
			'n/no-deprecated-api': 'error',
			'n/no-exports-assign': 'error',
			'n/no-new-require': 'error',
			'n/no-path-concat': 'error',
			'n/prefer-global/buffer': ['error', 'never'],
			'n/prefer-global/process': ['error', 'never'],
			'n/process-exit-as-throw': 'error',
		},
	};
}
