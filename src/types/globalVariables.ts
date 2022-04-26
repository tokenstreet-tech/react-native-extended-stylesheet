import type { TMediaQueriesKeys } from './mediaQueries';
import type { TExtendedVariablesKeys, TExtendedVariablesValues } from './variables';

export type TGlobalVariables<T> = {
    [P in keyof T]: P extends TExtendedVariablesKeys
        ? TExtendedVariablesValues
        : P extends TMediaQueriesKeys
        ? Record<TExtendedVariablesKeys, TExtendedVariablesValues>
        : never;
};
