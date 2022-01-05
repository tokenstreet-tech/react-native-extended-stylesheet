import type { FlexStyle, ImageStyle, Omit, TextStyle, ViewStyle } from 'react-native';

// Common
type TRem = `${number}rem`;
type TExtendedSizeValues = TRem | number | undefined;

type TExtendedVariablesKeys = `$${string}`;
type TExtendedVariablesValues = number | string;

type TMediaDirectionExpression = `(direction: ${'ltr' | 'rtl'})`;
type TMediaOrientationExpression = `(orientation: ${'landscape' | 'portrait'})`;
type TMediaSizeExpressionKeys =
    | 'aspect-ratio'
    | 'height'
    | 'max-height'
    | 'max-width'
    | 'min-height'
    | 'min-width'
    | 'width';
type TMediaSizeExpression = `(${TMediaSizeExpressionKeys}: ${number})`;
type TMediaExpression = TMediaDirectionExpression | TMediaOrientationExpression | TMediaSizeExpression;
type TMediaType = 'android' | 'ios';
type TMediaQueriesKeys = `@media ${TMediaExpression | TMediaType}${'' | ` and ${TMediaExpression}`}`;

// Flex styles
type TFlexStyleSizeKeys = Pick<FlexStyle, 'borderBottomWidth'>;
type TOmittedFlexStyle = Omit<FlexStyle, keyof TFlexStyleSizeKeys>;
type TFlexStyleSize = Partial<Record<keyof TFlexStyleSizeKeys, TExtendedSizeValues>>;
type TCombinedFlexStyle = TFlexStyleSize & TOmittedFlexStyle;
type TFuncFlexStyle = {
    [Key in keyof TCombinedFlexStyle]:
        | TCombinedFlexStyle[Key]
        | TExtendedVariablesKeys
        | (() => TCombinedFlexStyle[Key]);
};
interface IExtendedFlexStyle extends TFuncFlexStyle {}

// View styles
type TViewStyleSizeKeys = Pick<Omit<ViewStyle, keyof FlexStyle>, 'borderRadius'>;
type TOmittedViewStyle = Omit<ViewStyle, keyof IExtendedFlexStyle | keyof TViewStyleSizeKeys>;
type TViewStyleSize = Partial<Record<keyof TViewStyleSizeKeys, TExtendedSizeValues>>;
type TCombinedViewStyle = TOmittedViewStyle & TViewStyleSize;
type TFuncViewStyle = {
    [Key in keyof TCombinedViewStyle]:
        | TCombinedViewStyle[Key]
        | TExtendedVariablesKeys
        | (() => TCombinedViewStyle[Key]);
};

interface IExtendedViewStyle extends IExtendedFlexStyle, TFuncViewStyle {}

// Image styles
type TImageStyleSizeKeys = Pick<Omit<ImageStyle, keyof FlexStyle>, 'borderRadius'>;
type TOmittedImageStyle = Omit<ImageStyle, keyof IExtendedFlexStyle | keyof TImageStyleSizeKeys>;
type TImageStyleSize = Partial<Record<keyof TImageStyleSizeKeys, TExtendedSizeValues>>;
type TCombinedImageStyle = TImageStyleSize & TOmittedImageStyle;
type TFuncImageStyle = {
    [Key in keyof TCombinedImageStyle]:
        | TCombinedImageStyle[Key]
        | TExtendedVariablesKeys
        | (() => TCombinedImageStyle[Key]);
};
interface IExtendedImageStyle extends IExtendedFlexStyle, TFuncImageStyle {}

// Text styles
type TTextStyleSizeKeys = Pick<Omit<TextStyle, keyof ViewStyle>, 'fontSize'>;
type TOmittedTextStyle = Omit<TextStyle, keyof TTextStyleSizeKeys | keyof ViewStyle>;
type TTextStyleSize = Partial<Record<keyof TTextStyleSizeKeys, TExtendedSizeValues>>;
type TCombinedTextStyle = TOmittedTextStyle & TTextStyleSize;
type TFuncTextStyle = {
    [Key in keyof TCombinedTextStyle]:
        | TCombinedTextStyle[Key]
        | TExtendedVariablesKeys
        | (() => TCombinedTextStyle[Key]);
};
interface IExtendedTextStyle extends IExtendedViewStyle, TFuncTextStyle {}

// Export
type TExtendedStyles = IExtendedImageStyle | IExtendedTextStyle | IExtendedViewStyle;
export type TExtendedNamedStyles<T> = {
    [P in keyof T]: P extends TExtendedVariablesKeys
        ? TExtendedVariablesValues
        : P extends TMediaQueriesKeys
        ? // TODO: Replace string to make media queries typesafe
          Record<string, TExtendedStyles>
        : Record<TMediaQueriesKeys, TExtendedStyles> | TExtendedStyles;
};
