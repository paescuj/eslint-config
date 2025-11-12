import type { FlatConfigItem } from '../types.js';
import { GLOB_JS_TS, GLOB_JS_TS_EXT } from '../globs.js';

export function disables(): FlatConfigItem {
	return [
		{
			name: 'paescuj/disables/scripts',
			files: [`**/scripts/${GLOB_JS_TS}`],
			rules: {
				'no-console': 'off',
			},
		},
		{
			files: [`**/cli/${GLOB_JS_TS}`, `**/cli.${GLOB_JS_TS_EXT}`],
			name: 'paescuj/disables/cli',
			rules: {
				'no-console': 'off',
			},
		},
	];
}
