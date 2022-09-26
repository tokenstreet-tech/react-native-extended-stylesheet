/**
 * Variables
 */

import resolvePath from 'object-resolve-path';

const PREFIX = '$';

/**
 * Is string equals to another variable: '$varName'
 * @param {String} str
 */
export const isVar = (str?: string): boolean => typeof str === 'string' && str.startsWith(PREFIX);

/**
 * Replace var with value from vars arr.
 * @param {String} str variable name with $, e.g. '$color'
 * @param {Array<Object>} varsArr array of variable sets to search into.
 */
export const calc = (str: string, varsArr: any): any => {
    const realValue = get(str, varsArr);
    if (realValue === undefined) {
        throw new Error(`Unresolved variable: ${str}`);
    }
    return realValue;
};

/**
 * Extract variables from mixed object
 * @param {Object} obj
 * @returns {null|Object}
 */
export const extract = (obj: any): any =>
    Object.keys(obj).reduce((res: any, key) => {
        let returnRes = res;
        if (isVar(key)) {
            returnRes ||= {};
            returnRes[key] = obj[key];
        }
        return returnRes;
    }, null);

/**
 * Return variable value using provided array of variable sets
 * @param {String} name variable with $, e.g. '$myVar'
 * @param {Array} varsArr array of variable sets
 */
export const get = (name: string, varsArr: Readonly<Array<any>>): any => {
    if (!Array.isArray(varsArr)) {
        throw new Error('You should pass vars array to vars.get()');
    }

    const machtedName = /[^.[]*/u.exec(name);
    const [rootVar] = machtedName ? machtedName : [],
        isSimpleVar = rootVar === name;

    for (const vars of varsArr) {
        if (!vars || vars[rootVar] === undefined) {
            continue;
        }
        if (isSimpleVar) {
            return vars[name];
        }
        try {
            return resolvePath({ [rootVar]: vars[rootVar] }, name);
        } catch (error) {
            return undefined;
        }
    }
};
