/**
 * Implementation of CSS pseudo class :first-child, :last-child, :nth-child
 */

import type { AnyStyle, StyleSet } from './types/common';

/**
 * Returns base style and style with child pseudo selector
 * @param {Object} styles
 * @param {String} styleName
 * @param {Number} index
 * @param {Number} count
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

const addStyle = (result: any, styles: any, styleName: string, condition: boolean) => {
    if (styles[styleName] && condition) {
        result.push(styles[styleName]);
    }
};

const isNumber = (value: number) => typeof value === 'number';
