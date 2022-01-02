import type { FlexStyle, ImageStyle, TextStyle, ViewStyle } from 'react-native';

// Common
type TExtendedSizeValues = number | string | undefined;

// Flex styles
type TExtendedFlexStyle = {
    [Key in keyof FlexStyle]: FlexStyle[Key] | (() => FlexStyle[Key]);
};

// View styles
type TOmittedViewStyle = Omit<ViewStyle, keyof FlexStyle>;
type TFuncViewStyle = {
    [Key in keyof TOmittedViewStyle]: TOmittedViewStyle[Key] | (() => TOmittedViewStyle[Key]);
};
interface IExtendedViewStyle extends TExtendedFlexStyle, TFuncViewStyle {}

// Image styles
type TOmittedImageStyle = Omit<ImageStyle, keyof FlexStyle>;
type TFuncImageStyle = {
    [Key in keyof TOmittedImageStyle]: TOmittedImageStyle[Key] | (() => TOmittedImageStyle[Key]);
};
interface IExtendedImageStyle extends TExtendedFlexStyle, TFuncImageStyle {}

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
