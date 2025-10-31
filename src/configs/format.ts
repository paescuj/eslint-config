import type { Linter } from 'eslint';
import type { DprintOptions } from '../plugins/format/types.js';
import type { FlatConfigItem } from '../types.js';
import * as parserPlain from 'eslint-parser-plain';
import { GLOB_GRAPHQL, GLOB_HTML, GLOB_MARKDOWN, GLOB_STYLE } from '../globs.js';
import pluginFormat from '../plugins/format/index.js';

export function format(): FlatConfigItem {
	const globalOptions: DprintOptions = {
		useTabs: true,
		lineWidth: 120,
	};

	return [
		{
			name: 'paescuj/format',
			plugins: {
				format: pluginFormat,
			},
		},

		createDprintConfig('html', [GLOB_HTML], { whitespaceSensitivity: 'ignore', formatComments: true }),
		createDprintConfig('style', [GLOB_STYLE], { quotes: 'preferSingle', formatComments: true }),
		createDprintConfig('markdown', [GLOB_MARKDOWN], { textWrap: 'always' }),
		createDprintConfig('graphql', [GLOB_GRAPHQL], { formatComments: true }),

		{
			name: 'paescuj/format/shell',
			files: ['**/*.sh'],
			languageOptions: {
				parser: parserPlain,
			},
			rules: {
				'format/shfmt': ['error'],
			},
		},
	];

	function createDprintConfig(name: string, files: string[], languageOptions?: DprintOptions['languageOptions']): Linter.Config {
		const dprintOptions: DprintOptions = {
			...globalOptions,
			...(languageOptions && { languageOptions }),
		};

		return {
			name: `paescuj/format/${name}`,
			files,
			languageOptions: {
				parser: parserPlain,
			},
			rules: {
				'format/dprint': ['error', dprintOptions],
			},
		};
	}
}
