import type { FlexStyle, ImageStyle, Omit, PlatformOSType, TextStyle, ViewStyle } from 'react-native';

import type { TMathOperator } from '../replacers/operation';

// Util
type TypesafeExtract<T extends U, U> = T extends U ? T : never;

// Common
type TMathOperand = TExtendedVariablesKeys | number;
type TMathCalculation = `${TMathOperand} ${TMathOperator} ${TMathOperand}`;
type TPercent = `${number}%`;
type TRem = `${number}rem`;
type TExtendedSizeValues = TMathCalculation | TPercent | TRem | number | 'auto' | undefined;

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
type TMediaType = TypesafeExtract<'android' | 'ios', PlatformOSType>;
type TMediaQueriesKeys = `@media ${TMediaExpression | TMediaType}${'' | ` and ${TMediaExpression}`}`;

// Flex styles
type TFlexStyleSizeKeys = Pick<
    FlexStyle,
    | 'borderBottomWidth'
    | 'borderEndWidth'
    | 'borderLeftWidth'
    | 'borderRightWidth'
    | 'borderStartWidth'
    | 'borderTopWidth'
    | 'borderWidth'
    | 'height'
    | 'left'
    | 'margin'
    | 'marginBottom'
    | 'marginEnd'
    | 'marginHorizontal'
    | 'marginLeft'
    | 'marginRight'
    | 'marginStart'
    | 'marginTop'
    | 'marginVertical'
    | 'maxHeight'
    | 'maxWidth'
    | 'minHeight'
    | 'minWidth'
    | 'padding'
    | 'paddingBottom'
    | 'paddingEnd'
    | 'paddingHorizontal'
    | 'paddingLeft'
    | 'paddingRight'
    | 'paddingStart'
    | 'paddingTop'
    | 'paddingVertical'
    | 'right'
    | 'start'
    | 'top'
    | 'width'
>;
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
type TViewStyleSizeKeys = Pick<
    Omit<ViewStyle, keyof FlexStyle>,
    | 'borderBottomEndRadius'
    | 'borderBottomLeftRadius'
    | 'borderBottomRightRadius'
    | 'borderBottomStartRadius'
    | 'borderRadius'
    | 'borderTopEndRadius'
    | 'borderTopLeftRadius'
    | 'borderTopRightRadius'
    | 'borderTopStartRadius'
>;
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
type TImageStyleSizeKeys = Pick<
    Omit<ImageStyle, keyof FlexStyle>,
    | 'borderBottomLeftRadius'
    | 'borderBottomRightRadius'
    | 'borderRadius'
    | 'borderTopLeftRadius'
    | 'borderTopRightRadius'
>;
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
type TTextStyleSizeKeys = Pick<
    Omit<TextStyle, keyof ViewStyle>,
    'fontSize' | 'letterSpacing' | 'lineHeight' | 'textShadowRadius'
>;
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
type TStyles = ImageStyle | TextStyle | ViewStyle;
export type TNamedStyles<T> = {
    [P in keyof T]: P extends TExtendedVariablesKeys ? TExtendedVariablesValues : TStyles;
};
