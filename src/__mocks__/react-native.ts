import type { ScaledSize } from 'react-native';

/**
 * React-native mock
 */

export const Dimensions = {
    get: (): Partial<ScaledSize> => ({ width: 100, height: 200 }),
};

export const Platform = {
    OS: 'ios',
};

export const I18nManager = {
    isRTL: false,
};

export const StyleSheet = {
    create(obj: any): any {
        return Object.keys(obj).reduce((res: any, key, index) => {
            res[key] = index;
            return res;
        }, {});
    },
    flatten(arr: any): any {
        return arr.reduce((res: any, item: any) => Object.assign(res, item), {});
    },
    hairlineWidth: 1,
};

export default {
    Dimensions,
    Platform,
    StyleSheet,
    I18nManager,
};
