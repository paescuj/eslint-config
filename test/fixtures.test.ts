import fs from 'node:fs/promises';
import path from 'node:path';
import { execa } from 'execa';
import { afterAll, beforeAll, it } from 'vitest';

const from = path.resolve('fixtures/input');
const output = path.resolve('fixtures/output');
const target = path.resolve('_fixtures');

beforeAll(async () => {
	await fs.rm('_fixtures', { recursive: true, force: true });

	await fs.cp(from, target, { recursive: true });

	await fs.writeFile(
		path.join(target, 'eslint.config.js'),
		`// @eslint-disable\nexport { default } from '@paescuj/eslint-config';\n`,
	);

	await execa('pnpm', ['build'], { stdio: 'pipe' });

	await execa('pnpm', ['eslint', '--flag', 'v10_config_lookup_from_file', '--fix', target], {
		stdio: 'pipe',
	});
}, 15_000);

afterAll(async () => {
	await fs.rm('_fixtures', { recursive: true, force: true });
});

const files = await getFileList();

it.concurrent.for(files)('%s', async (file, { expect }) => {
	const content = await fs.readFile(path.join(target, file), 'utf8');
	const source = await fs.readFile(path.join(from, file), 'utf8');

	if (content === source) {
		const outputPath = path.join(output, file);
		fs.unlink(outputPath).catch(() => {});
		return;
	}

	await expect.soft(content).toMatchFileSnapshot(path.join(output, file));
});

async function getFileList() {
	const files: string[] = [];

	for await (const entry of fs.glob('**/*', {
		cwd: from,
		withFileTypes: true,
	})) {
		if (entry.isFile())
			files.push(path.join(path.relative(from, entry.parentPath), entry.name));
	}

	return files;
}
