import type { FlexStyle, ImageStyle, Omit, TextStyle, ViewStyle } from 'react-native';

// Common
type TRem = `${number}rem`;
type TExtendedSizeValues = TRem | number | undefined;

type TExtendedVariablesKeys = `$${string}`;
type TExtendedVariablesValues = number | string;

// TODO: Make media queries more typesafe
type TMediaQueriesKeys = `@media ${string}`;

// Flex styles
type TFlexStyleSizeKeys = Pick<FlexStyle, 'borderBottomWidth'>;
type TOmittedFlexStyle = Omit<FlexStyle, keyof TFlexStyleSizeKeys>;
type TFuncFlexStyle = {
    [Key in keyof TOmittedFlexStyle]: TOmittedFlexStyle[Key] | (() => TOmittedFlexStyle[Key]);
};
type TFlexStyleSize = Partial<Record<keyof TFlexStyleSizeKeys, TExtendedSizeValues>>;
interface IExtendedFlexStyle extends TFlexStyleSize, TFuncFlexStyle {}

// View styles
type TViewStyleSizeKeys = Pick<Omit<ViewStyle, keyof FlexStyle>, 'borderRadius'>;
type TOmittedViewStyle = Omit<ViewStyle, keyof IExtendedFlexStyle | keyof TViewStyleSizeKeys>;
type TFuncViewStyle = {
    [Key in keyof TOmittedViewStyle]: TExtendedVariablesKeys | TOmittedViewStyle[Key] | (() => TOmittedViewStyle[Key]);
};
type TViewStyleSize = Partial<Record<keyof TViewStyleSizeKeys, TExtendedSizeValues>>;
interface IExtendedViewStyle extends IExtendedFlexStyle, TFuncViewStyle, TViewStyleSize {}

// Image styles
type TImageStyleSizeKeys = Pick<Omit<ImageStyle, keyof FlexStyle>, 'borderRadius'>;
type TOmittedImageStyle = Omit<ImageStyle, keyof IExtendedFlexStyle | keyof TImageStyleSizeKeys>;
type TFuncImageStyle = {
    [Key in keyof TOmittedImageStyle]:
        | TExtendedVariablesKeys
        | TOmittedImageStyle[Key]
        | (() => TOmittedImageStyle[Key]);
};
type TImageStyleSize = Partial<Record<keyof TImageStyleSizeKeys, TExtendedSizeValues>>;
interface IExtendedImageStyle extends IExtendedFlexStyle, TFuncImageStyle, TImageStyleSize {}

// Text styles
type TTextStyleSizeKeys = Pick<Omit<TextStyle, keyof ViewStyle>, 'fontSize'>;
type TOmittedTextStyle = Omit<TextStyle, keyof TTextStyleSizeKeys | keyof ViewStyle>;
type TFuncTextStyle = {
    [Key in keyof TOmittedTextStyle]: TExtendedVariablesKeys | TOmittedTextStyle[Key] | (() => TOmittedTextStyle[Key]);
};
type TTextStyleSize = Partial<Record<keyof TTextStyleSizeKeys, TExtendedSizeValues>>;
interface IExtendedTextStyle extends IExtendedViewStyle, TFuncTextStyle, TTextStyleSize {}

// Export
type TExtendedStyles = IExtendedImageStyle | IExtendedTextStyle | IExtendedViewStyle;
export type TExtendedNamedStyles<T> = {
    [P in keyof T]: P extends TExtendedVariablesKeys
        ? TExtendedVariablesValues
        : P extends TMediaQueriesKeys
        ? // TODO: Replace string to make media queries typesafe
          Record<string, TExtendedStyles>
        : TExtendedStyles;
};
