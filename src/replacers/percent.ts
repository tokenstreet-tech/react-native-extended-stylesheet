/**
 * Calculation of percent strings
 */

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window'),
    V_PROPS = ['height', 'top', 'bottom', 'vertical'],
    H_PROPS = ['width', 'left', 'right', 'horizontal'],
    SUFFIX = '%',
    invalidPropMsg = [
        `Name of variable or property with percent value should contain `,
        `(${V_PROPS.concat(H_PROPS).join()}) to define base for percent calculation`,
    ].join('');

/**
 * Is string contains percent
 * @param {String} str
 * @returns {boolean}
 */
export const isPercent = (str: string): boolean => str.endsWith(SUFFIX);

/**
 * Calc percent to pixels
 * @param {String} str
 * @param {String} prop
 * @returns {number}
 */
export const calc = (str: string, prop?: string): number => {
    const percent = parseInt(str.substring(0, str.length - 1), 10),
        base = isVertical(prop) ? height : width;
    return (base * percent) / 100;
};

const isVertical = (prop?: string): boolean => {
    const lowercaseProp = (prop ?? '').toLowerCase();
    if (V_PROPS.some((p) => lowercaseProp.includes(p))) {
        return true;
    }
    if (H_PROPS.some((p) => lowercaseProp.includes(p))) {
        return false;
    }
    throw new Error(invalidPropMsg);
};
