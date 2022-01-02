/**
 * Scale property if needed
 */

const SCALABLE_PROPS = ['width', 'height', 'margin', 'padding', 'fontsize', 'radius'];

/**
 * Is value & property scalable
 * @param {*} value
 * @param {String} prop
 * @returns {Boolean}
 */
export const isScalable = (value: any, prop?: string): boolean => typeof value === 'number' && isScalableProp(prop);

/**
 * Performs scaling
 * @param {Number} value
 * @param {Number} scaleFactor
 * @returns {number}
 */
export const calc = (value: number, scaleFactor: number): number => {
    if (typeof value !== 'number') {
        throw new Error(`Invalid value for scale: ${value}`);
    }
    if (typeof scaleFactor !== 'number') {
        throw new Error(`Invalid scaleFactor for scale: ${scaleFactor}`);
    }
    return value * scaleFactor;
};

const isScalableProp = (prop?: string): boolean => {
    if (typeof prop !== 'string') {
        return false;
    }
    return SCALABLE_PROPS.some((p) => prop.toLowerCase().includes(p));
};
