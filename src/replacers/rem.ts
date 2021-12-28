/**
 * Calculation of REM strings
 */

const DEFAULT_REM = 16,
    SUFFIX = 'rem';

/**
 * Is string contains rem
 * @param {String} str
 * @returns {Boolean}
 */
export const isRem = (str: string) => str.substr(-SUFFIX.length) === SUFFIX;

/**
 * Calculate rem to pixels: '1.2rem' => 1.2 * rem
 * @param {String} str
 * @param {Number} rem
 * @returns {number}
 */
export const calc = (str: string, rem = DEFAULT_REM) => {
    const koefStr = str.substr(0, str.length - SUFFIX.length),
        koef = koefStr === '' ? 1 : parseFloat(koefStr);
    if (isNaN(koef)) {
        throw new Error(`Invalid rem value: ${str}`);
    }
    return rem * koef;
};
