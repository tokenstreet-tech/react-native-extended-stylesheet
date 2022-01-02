import type { FlexStyle, ImageStyle, TextStyle, ViewStyle } from 'react-native';

// Common
type TExtendedSizeValues = number | string | undefined;

// Flex styles
type TOmittedFlexStyle = Omit<FlexStyle, keyof FlexStyle | 'borderBottomWidth'>;
type TFuncFlexStyle = {
    [Key in keyof TOmittedFlexStyle]: TOmittedFlexStyle[Key] | (() => TOmittedFlexStyle[Key]);
};
interface IExtendedFlexStyle extends TFuncFlexStyle {
    borderBottomWidth?: TExtendedSizeValues;
}

// View styles
type TOmittedViewStyle = Omit<ViewStyle, keyof IExtendedFlexStyle | 'borderRadius'>;
type TFuncViewStyle = {
    [Key in keyof TOmittedViewStyle]: TOmittedViewStyle[Key] | (() => TOmittedViewStyle[Key]);
};
interface IExtendedViewStyle extends IExtendedFlexStyle, TFuncViewStyle {
    borderRadius?: TExtendedSizeValues;
}

// Image styles
type TOmittedImageStyle = Omit<ImageStyle, keyof IExtendedFlexStyle>;
type TFuncImageStyle = {
    [Key in keyof TOmittedImageStyle]: TOmittedImageStyle[Key] | (() => TOmittedImageStyle[Key]);
};
interface IExtendedImageStyle extends IExtendedFlexStyle, TFuncImageStyle {}

// Text styles
type TOmittedTextStyle = Omit<TextStyle, keyof ViewStyle | 'fontSize'>;
type TFuncTextStyle = {
    [Key in keyof TOmittedTextStyle]: TOmittedTextStyle[Key] | (() => TOmittedTextStyle[Key]);
};
interface IExtendedTextStyle extends IExtendedViewStyle, TFuncTextStyle {
    fontSize?: TExtendedSizeValues;
}

// Export
export type TExtendedStyles = IExtendedImageStyle | IExtendedTextStyle | IExtendedViewStyle;
