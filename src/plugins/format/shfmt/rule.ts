import type { Rule } from 'eslint';
import type { AsyncShfmtFormat, ShfmtFormat } from '../types.js';
import { fileURLToPath } from 'node:url';
import { messages, reportDifferences } from 'eslint-formatting-reporter';
import { createSyncFn } from 'synckit';

const __WORKER_PATH__ = 'worker.ts';

let format: ShfmtFormat;

const rule: Rule.RuleModule = {
	meta: {
		type: 'layout',
		docs: {
			description: 'Use shfmt to format code',
			url: 'https://github.com/patrickvane/shfmt',
		},
		fixable: 'whitespace',
		schema: [],
		messages,
	},
	create(context) {
		if (!format) {
			format = createSyncFn<AsyncShfmtFormat>(fileURLToPath(new URL(__WORKER_PATH__, import.meta.url)));
		}

		return {
			Program() {
				const sourceCode = context.sourceCode.text;

				try {
					const formatted = format(sourceCode, context.filename);

					reportDifferences(context, sourceCode, formatted);
				}
				catch (error) {
					context.report({
						loc: {
							start: { line: 1, column: 0 },
							end: { line: 1, column: 0 },
						},
						message: `Failed to format the code: ${error}`,
					});
				}
			},
		};
	},
};

export default rule;
