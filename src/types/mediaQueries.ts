import type { PlatformOSType } from 'react-native';

import type { TypesafeExtract } from './util';

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
export type TMediaQueriesKeys = `@media ${TMediaExpression | TMediaType}${'' | ` and ${TMediaExpression}`}`;
