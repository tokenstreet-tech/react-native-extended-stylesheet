import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

type TValueExprValues = Array<any> | Record<string, any> | number | string | null;
export type TValueExpr = TValueExprValues | (() => TValueExprValues);
export interface TRawGlobalVars {
    [key: string]: Array<TRawGlobalVars> | TRawGlobalVars | boolean | number | string | undefined;
}

type NamedStyles<T> = { [P in keyof T]: ImageStyle | TextStyle | ViewStyle };
export type StyleObject<T> = NamedStyles<T> | T;
