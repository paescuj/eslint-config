import fs from 'node:fs/promises';
import path from 'node:path';
import { defineConfig } from 'tsdown';
import pluginReplace from 'unplugin-replace/rollup';

export default defineConfig({
	entry: {
		'index': 'src/index.ts',
		'format/dprint/worker': 'src/plugins/format/dprint/worker.ts',
		'format/shfmt/worker': 'src/plugins/format/shfmt/worker.ts',
	},
	dts: true,
	plugins: [
		pluginReplace(
			{
				values: [

					{
						find: 'worker.ts',
						replacement: (id, match) => {
							if (id.includes('shfmt')) return 'format/shfmt/worker.mjs';
							if (id.includes('dprint')) return 'format/dprint/worker.mjs';
							return match[0];
						},
					},
				],
			},

		),
	],
	onSuccess: async () => {
		const promises: Promise<void>[] = [];

		for await (const entry of fs.glob('src/plugins/format/dprint/plugins/*.wasm')) {
			promises.push(fs.cp(entry, path.join('dist/format/dprint/plugins', path.basename(entry))));
		}

		await Promise.all(promises);
	},
});
