/**
 * Media queries
 * Supported values:
 * - (type) ios, android
 * - height, min-height, max-height
 * - width, min-width, max-width
 * - orientation
 * - aspect-ratio
 */

import { Dimensions, I18nManager, Platform } from 'react-native';
import mediaQuery from 'css-mediaquery';
import { isObject } from '../utils';

const PREFIX = '@media';

/**
 * Is string is media query
 * @param {String} str
 */
const isMediaQuery = (str: string) => typeof str === 'string' && str.indexOf(PREFIX) === 0;

/**
 * Process and apply media queries in object
 * @param {Object} obj
 * @returns {null|Object}
 */
const process = (obj: any) => {
    const mqKeys: any = [],
        // Copy non-media-query stuff
        res = Object.keys(obj).reduce((res: any, key) => {
            if (!isMediaQuery(key)) {
                res[key] = obj[key];
            } else {
                mqKeys.push(key);
            }
            return res;
        }, {});

    // Apply media query stuff
    if (mqKeys.length) {
        const matchObject = getMatchObject();
        mqKeys.forEach((key: any) => {
            const mqStr = key.replace(PREFIX, ''),
                isMatch = mediaQuery.match(mqStr, matchObject);
            if (isMatch) {
                merge(res, obj[key]);
            }
        });
    }

    return res;
};

/**
 * Returns object to match media query
 * @returns {Object}
 */
const getMatchObject = () => {
    const win = Dimensions.get('window'),
        { isRTL } = I18nManager;
    return {
        width: win.width,
        height: win.height,
        orientation: win.width > win.height ? 'landscape' : 'portrait',
        'aspect-ratio': win.width / win.height,
        type: Platform.OS,
        direction: isRTL ? 'rtl' : 'ltr',
    };
};

/**
 * Merge media query obj into parent obj
 * @param {Object} obj
 * @param {Object} mqObj
 */
const merge = (obj: any, mqObj: any) => {
    Object.keys(mqObj).forEach((key) => {
        if (isObject(obj[key]) && isObject(mqObj[key])) {
            Object.assign(obj[key], mqObj[key]);
        } else {
            obj[key] = mqObj[key];
        }
    });
};

export default {
    isMediaQuery,
    process,
};
