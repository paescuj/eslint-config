import type { FlatConfigItem } from '../types.js';
import pluginCommandConfig from 'eslint-plugin-command/config';

export function command(): FlatConfigItem {
	const config = pluginCommandConfig();

	return {
		name: 'paescuj/command',
		plugins: config.plugins!,
		rules: config.rules!,
	};
}
