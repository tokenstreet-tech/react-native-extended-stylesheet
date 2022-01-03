import type { FlexStyle, ImageStyle, Omit, TextStyle, ViewStyle } from 'react-native';

// Common
type TExtendedSizeValues = number | string | undefined;

// Flex styles
type TFlexStyleSizeKeys = Pick<FlexStyle, 'borderBottomWidth'>;
type TOmittedFlexStyle = Omit<FlexStyle, keyof TFlexStyleSizeKeys>;
type TFuncFlexStyle = {
    [Key in keyof TOmittedFlexStyle]: TOmittedFlexStyle[Key] | (() => TOmittedFlexStyle[Key]);
};
type TExtendedFlexStyle = Record<keyof TFlexStyleSizeKeys, TExtendedSizeValues> & TFuncFlexStyle;

// View styles
type TViewStyleSizeKeys = Pick<Omit<ViewStyle, keyof FlexStyle>, 'borderRadius'>;
type TOmittedViewStyle = Omit<ViewStyle, keyof TExtendedFlexStyle | keyof TViewStyleSizeKeys>;
type TFuncViewStyle = {
    [Key in keyof TOmittedViewStyle]: TOmittedViewStyle[Key] | (() => TOmittedViewStyle[Key]);
};
type TExtendedViewStyle = Record<keyof TViewStyleSizeKeys, TExtendedSizeValues> & TExtendedFlexStyle & TFuncViewStyle;

// Image styles
type TImageStyleSizeKeys = Pick<Omit<ImageStyle, keyof FlexStyle>, 'borderRadius'>;
type TOmittedImageStyle = Omit<ImageStyle, keyof TExtendedFlexStyle | keyof TImageStyleSizeKeys>;
type TFuncImageStyle = {
    [Key in keyof TOmittedImageStyle]: TOmittedImageStyle[Key] | (() => TOmittedImageStyle[Key]);
};
type TExtendedImageStyle = Record<keyof TImageStyleSizeKeys, TExtendedSizeValues> &
    TExtendedFlexStyle &
    TFuncImageStyle;

// Text styles
type TTextStyleSizeKeys = Pick<Omit<TextStyle, keyof ViewStyle>, 'fontSize'>;
type TOmittedTextStyle = Omit<TextStyle, keyof TTextStyleSizeKeys | keyof ViewStyle>;
type TFuncTextStyle = {
    [Key in keyof TOmittedTextStyle]: TOmittedTextStyle[Key] | (() => TOmittedTextStyle[Key]);
};
type TExtendedTextStyle = Record<keyof TTextStyleSizeKeys, TExtendedSizeValues> & TExtendedViewStyle & TFuncTextStyle;

// Export
export type TExtendedStyles = TExtendedImageStyle | TExtendedTextStyle | TExtendedViewStyle;
