import type { AsyncShfmtFormat } from '../types.js';
import { execa } from 'execa';
import { runAsWorker } from 'synckit';

const format: AsyncShfmtFormat = async (code, filename) => {
	const { stdout } = await execa`shfmt ${filename}`;

	return stdout;
};

runAsWorker(format);
