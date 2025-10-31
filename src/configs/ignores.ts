import type { FlatConfigItem } from '../types.js';
import gitignore from 'eslint-config-flat-gitignore';
import { GLOBS_EXCLUDE } from '../globs.js';

export function ignores(): FlatConfigItem {
	const { ignores } = gitignore({
		strict: false,
	});

	return {
		name: 'paescuj/ignores',
		ignores: [...ignores, ...GLOBS_EXCLUDE],
	};
}
