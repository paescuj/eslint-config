import type { AsyncShfmtFormat } from '../types.js';
import { EOL } from 'node:os';
import { execa } from 'execa';
import { runAsWorker } from 'synckit';

const format: AsyncShfmtFormat = async (code) => {
	const { stdout } = await execa({ input: code })`shfmt`;

	if (!stdout) return '';

	return `${stdout}${EOL}`;
};

runAsWorker(format);
