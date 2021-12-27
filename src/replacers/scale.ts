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
const isScalable = (value: any, prop: string) => typeof value === 'number' && isScalableProp(prop);

/**
 * Performs scaling
 * @param {Number} value
 * @param {Number} scaleFactor
 * @returns {number}
 */
const calc = (value: number, scaleFactor: number) => {
    if (typeof value !== 'number') {
        throw new Error(`Invalid value for scale: ${value}`);
    }
    if (typeof scaleFactor !== 'number') {
        throw new Error(`Invalid scaleFactor for scale: ${scaleFactor}`);
    }
    return value * scaleFactor;
};

const isScalableProp = (prop: string) => {
    if (typeof prop !== 'string') {
        return false;
    }
    prop = prop.toLowerCase();
    return SCALABLE_PROPS.some((p) => prop.indexOf(p) >= 0);
};

export default {
    isScalable,
    calc,
};
