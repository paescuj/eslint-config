import type { GlobalConfiguration } from '@dprint/formatter';

export interface DprintOptions extends GlobalConfiguration {
	languageOptions?: Record<string, unknown>;
}

/** Async equivalent of a sync function */
type AsyncFunction<T extends (...arguments_: any[]) => any> = (...arguments_: Parameters<T>) => Promise<ReturnType<T>>;

export type DprintFormat = (code: string, filename: string, options: DprintOptions) => string;
export type AsyncDprintFormat = AsyncFunction<DprintFormat>;

export type ShfmtFormat = (code: string) => string;
export type AsyncShfmtFormat = AsyncFunction<ShfmtFormat>;
