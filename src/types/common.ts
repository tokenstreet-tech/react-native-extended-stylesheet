import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

type TValueExprValues = Array<any> | Record<string, any> | number | string | null;
export type TValueExpr = TValueExprValues | (() => TValueExprValues);
export interface TRawGlobalVars {
    [key: string]: Array<TRawGlobalVars> | TRawGlobalVars | boolean | number | string | undefined;
}

type NamedStyles<T> = { [P in keyof T]: ImageStyle | TextStyle | ViewStyle };
export type StyleObject<T> = NamedStyles<T> | T;

/**
 * This file contains rather loose declarations for Extended StyleSheets.
 *
 * Writing strict declarations is a tricky (impossible?) task,
 * because EStyleSheet actively operates with dynamic keys:
 * - variables (started with "$...")
 * - media queries (started with "@media...")
 * - underscored output keys (started with "_...")
 *
 * Adding key augmention is tracked here: https://github.com/Microsoft/TypeScript/issues/12754
 */
type Function<K> = () => K;
// eslint-disable-next-line @typescript-eslint/ban-types
type Value<T> = T | (string & {});
// eslint-disable-next-line @typescript-eslint/ban-types
type Variable<T> = Function<Value<T>> | Value<T>;
type Extended<T> = { [K in keyof T]: Variable<T[K]> };

type AnyStyle = ImageStyle & TextStyle & ViewStyle;

type MediaQuery = Record<string, Extended<AnyStyle>>;

export type EStyleSet<T = any> = {
    [K in keyof T]: T[K] extends Variable<number>
        ? T[K]
        : T[K] extends MediaQuery
        ? T[K]
        : EStyleSet & Extended<AnyStyle>;
};

export type StyleSet<T = any> = {
    [K in keyof T]: T[K] extends number
        ? T[K]
        : T[K] extends string
        ? T[K]
        : // eslint-disable-next-line @typescript-eslint/ban-types
        T[K] extends Function<number>
        ? number
        : // eslint-disable-next-line @typescript-eslint/ban-types
        T[K] extends Function<string>
        ? string
        : T[K] extends MediaQuery
        ? any
        : AnyStyle;
};
