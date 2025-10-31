import type { FlatConfigItem } from '../types.js';
// @ts-expect-error untyped module
import pluginEslintComments from '@eslint-community/eslint-plugin-eslint-comments';

export function eslintComments(): FlatConfigItem {
	return {
		name: 'paescuj/eslint-comments',
		plugins: {
			'@eslint-community/eslint-comments': pluginEslintComments,
		},
		rules: pluginEslintComments.configs.recommended.rules,
	};
}
