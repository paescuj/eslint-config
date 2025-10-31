import type { Rule } from 'eslint';
import type { AsyncDprintFormat, DprintFormat } from '../types.js';
import { fileURLToPath } from 'node:url';
import { messages, reportDifferences } from 'eslint-formatting-reporter';
import { createSyncFn } from 'synckit';

const __WORKER_PATH__ = 'worker.ts';

let format: DprintFormat;

const rule: Rule.RuleModule = {
	meta: {
		type: 'layout',
		docs: {
			description: 'Use dprint to format code',
			url: 'https://dprint.dev',
		},
		fixable: 'whitespace',
		schema: [
			{
				type: 'object',
				properties: {
					languageOptions: {
						type: 'object',
					},
				},
				additionalProperties: true,
			},
		],
		messages,
	},
	create(context) {
		if (!format) {
			format = createSyncFn<AsyncDprintFormat>(fileURLToPath(new URL(__WORKER_PATH__, import.meta.url)));
		}

		return {
			Program() {
				const sourceCode = context.sourceCode.text;

				try {
					const formatted = format(sourceCode, context.filename, context.options[0] || {});

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
