import type { TExtendedStyles } from './extendedStyles';

export type TExtendedVariablesKeys = `$${string}`;
// TODO: Improve type with generics. Because sometimes you need exactly a number or a string, and not a union type.
type TExtendedVariablesREturnValues = TExtendedStyles | number | string;
export type TExtendedVariablesValues = TExtendedVariablesREturnValues | (() => TExtendedVariablesREturnValues);
