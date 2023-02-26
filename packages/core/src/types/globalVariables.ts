import type { TMediaQueriesKeys } from './mediaQueries';
import type { TExtendedVariablesKeys, TExtendedVariablesValues } from './variables';

export type TGlobalVariables<TGlobalVariablesObject> = {
    [TKey in keyof TGlobalVariablesObject]: TKey extends TExtendedVariablesKeys
        ? TExtendedVariablesValues
        : TKey extends TMediaQueriesKeys
        ? Record<TExtendedVariablesKeys, TExtendedVariablesValues>
        : never;
};
