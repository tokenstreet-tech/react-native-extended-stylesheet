import type { FlexStyle, ImageStyle, Omit, TextStyle, ViewStyle } from 'react-native';

// Common
type TExtendedSizeValues = number | string | undefined;

// Flex styles
type TFlexStyleSizeKeys = Pick<FlexStyle, 'borderBottomWidth'>;
type TOmittedFlexStyle = Omit<FlexStyle, keyof TFlexStyleSizeKeys>;
type TFuncFlexStyle = {
    [Key in keyof TOmittedFlexStyle]: TOmittedFlexStyle[Key] | (() => TOmittedFlexStyle[Key]);
};
type TFlexStyleSize = Record<keyof TFlexStyleSizeKeys, TExtendedSizeValues>;
interface IExtendedFlexStyle extends TFlexStyleSize, TFuncFlexStyle {}

// View styles
type TViewStyleSizeKeys = Pick<Omit<ViewStyle, keyof FlexStyle>, 'borderRadius'>;
type TOmittedViewStyle = Omit<ViewStyle, keyof IExtendedFlexStyle | keyof TViewStyleSizeKeys>;
type TFuncViewStyle = {
    [Key in keyof TOmittedViewStyle]: TOmittedViewStyle[Key] | (() => TOmittedViewStyle[Key]);
};
type TViewStyleSize = Record<keyof TViewStyleSizeKeys, TExtendedSizeValues>;
interface IExtendedViewStyle extends IExtendedFlexStyle, TFuncViewStyle, TViewStyleSize {}

// Image styles
type TImageStyleSizeKeys = Pick<Omit<ImageStyle, keyof FlexStyle>, 'borderRadius'>;
type TOmittedImageStyle = Omit<ImageStyle, keyof IExtendedFlexStyle | keyof TImageStyleSizeKeys>;
type TFuncImageStyle = {
    [Key in keyof TOmittedImageStyle]: TOmittedImageStyle[Key] | (() => TOmittedImageStyle[Key]);
};
type TImageStyleSize = Record<keyof TImageStyleSizeKeys, TExtendedSizeValues>;
interface IExtendedImageStyle extends IExtendedFlexStyle, TFuncImageStyle, TImageStyleSize {}

// Text styles
type TTextStyleSizeKeys = Pick<Omit<TextStyle, keyof ViewStyle>, 'fontSize'>;
type TOmittedTextStyle = Omit<TextStyle, keyof TTextStyleSizeKeys | keyof ViewStyle>;
type TFuncTextStyle = {
    [Key in keyof TOmittedTextStyle]: TOmittedTextStyle[Key] | (() => TOmittedTextStyle[Key]);
};
type TTextStyleSize = Record<keyof TTextStyleSizeKeys, TExtendedSizeValues>;
interface IExtendedTextStyle extends IExtendedViewStyle, TFuncTextStyle, TTextStyleSize {}

// Export
export type TExtendedStyles = IExtendedImageStyle | IExtendedTextStyle | IExtendedViewStyle;
