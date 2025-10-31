import type { ESLint } from 'eslint';
import dprint from './dprint/rule.js';
import shfmt from './shfmt/rule.js';

const plugin: ESLint.Plugin = {
	meta: {
		name: 'format',
	},
	rules: {
		dprint,
		shfmt,
	},
};

export default plugin;
