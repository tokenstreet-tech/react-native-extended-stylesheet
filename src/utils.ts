/**
 * Utils
 */

/**
 * Returns new object with excluded keys
 * @param {Object} obj
 * @param {Array|Object} keys
 */
export const excludeKeys = (obj: any, keys: any) => {
    keys = Array.isArray(keys) ? keys : keys ? Object.keys(keys) : [];
    return Object.keys(obj).reduce((res: any, key) => {
        if (keys.indexOf(key) === -1) {
            res[key] = obj[key];
        }
        return res;
    }, {});
};

/**
 * Is object
 * @param {*} obj
 */
export const isObject = (obj: any) => typeof obj === 'object' && obj !== null;
