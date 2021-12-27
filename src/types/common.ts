import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

export type TValueExpr = string | (() => string);
export type TRawGlobalVars = { [key: string]: string | number | boolean };

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };
export type StyleObject<T> = T | NamedStyles<T>;
