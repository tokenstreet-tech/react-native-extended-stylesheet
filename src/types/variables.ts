import type { TExtendedStyles } from './extendedStyles';

// Extended
export type TExtendedVariablesKeys = `$${string}`;

type TExtendedVariablesReturnValues = TExtendedStyles | number | string;
export type TExtendedVariablesValues = TExtendedVariablesReturnValues | (() => TExtendedVariablesReturnValues);

// Standard
export type TVariablesKeys = TExtendedVariablesKeys;
/*
 * TODO: Improve type with generics. Because sometimes you need exactly a number or a string, and not a union type.
 * export type TVariablesValues = TStyles | number | string;
 */
export type TVariablesValues = any;
