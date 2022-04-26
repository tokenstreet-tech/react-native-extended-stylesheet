export type TExtendedVariablesKeys = `$${string}`;
// TODO: Improve type with generics. Because sometimes you need exactly a number or a string, and not a union type.
export type TExtendedVariablesValues = number | string | (() => number | string);
