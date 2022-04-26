import type { TExtendedStyles, TStyles } from './extendedStyles';

// Extended
export type TExtendedVariablesKeys = `$${string}`;
// TODO: Improve type with generics. Because sometimes you need exactly a number or a string, and not a union type.
type TExtendedVariablesReturnValues = TExtendedStyles | number | string;
export type TExtendedVariablesValues = TExtendedVariablesReturnValues | (() => TExtendedVariablesReturnValues);

// Standard
export type TVariablesKeys = TExtendedVariablesKeys;
export type TVariablesValues = TStyles | number | string;
