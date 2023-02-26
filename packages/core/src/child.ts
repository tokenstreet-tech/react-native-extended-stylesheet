/**
 * Implementation of CSS pseudo class :first-child, :last-child, :nth-child
 */

import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

type AnyStyle = ImageStyle & TextStyle & ViewStyle;
type Function<K> = () => K;
// eslint-disable-next-line @typescript-eslint/ban-types
type Value<T> = T | (string & {});
// eslint-disable-next-line @typescript-eslint/ban-types
type Variable<T> = Function<Value<T>> | Value<T>;
type Extended<T> = { [K in keyof T]: Variable<T[K]> };
type MediaQuery = Record<string, Extended<AnyStyle>>;

type StyleSet<T = any> = {
    [K in keyof T]: T[K] extends number
        ? T[K]
        : T[K] extends string
        ? T[K]
        : // eslint-disable-next-line @typescript-eslint/ban-types
        T[K] extends Function<number>
        ? number
        : // eslint-disable-next-line @typescript-eslint/ban-types
        T[K] extends Function<string>
        ? string
        : T[K] extends MediaQuery
        ? any
        : AnyStyle;
};

/**
 * Returns styles with pseudo classes `:first-child`, `:nth-child-even`, `:last-child` according to index and count.
 * @param {Object} styles
 * @param {String} styleName
 * @param {Number} index Index of item for style
 * @param {Number} count Total count of items
 * @returns {Object|Array} styles
 */
export const child = <T = StyleSet>(styles: T, styleName: string, index: number, count: number): AnyStyle => {
    if (!isNumber(index) || !isNumber(count)) {
        return (styles as any)[styleName];
    }

    const result = [(styles as any)[styleName]];

    addStyle(result, styles, `${styleName}:first-child`, index === 0);
    addStyle(result, styles, `${styleName}:nth-child-even`, index < count && index % 2 === 0);
    addStyle(result, styles, `${styleName}:nth-child-odd`, index < count && index % 2 === 1);
    addStyle(result, styles, `${styleName}:last-child`, index === count - 1);

    return result.length > 1 ? result : result[0];
};

const addStyle = (result: any, styles: any, styleName: string, condition: boolean): void => {
    if (styles[styleName] && condition) {
        result.push(styles[styleName]);
    }
};

const isNumber = (value: number): boolean => typeof value === 'number';
