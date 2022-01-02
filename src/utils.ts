/**
 * Utils
 */

/**
 * Returns new object with excluded keys
 * @param {Object} obj
 * @param {Array|Object} keys
 */
export const excludeKeys = (obj: any, keys: any): any => {
    const parsedKeys = Array.isArray(keys) ? keys : keys ? Object.keys(keys) : [];
    return Object.keys(obj).reduce((res: any, key) => {
        if (!parsedKeys.includes(key)) {
            res[key] = obj[key];
        }
        return res;
    }, {});
};

/**
 * Is object
 * @param {*} obj
 */
export const isObject = (obj: any): boolean => typeof obj === 'object' && obj !== null;
