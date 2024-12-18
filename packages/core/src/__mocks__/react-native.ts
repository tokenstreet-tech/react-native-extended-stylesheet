import type ReactNative from 'react-native';
import type { DeepPartial } from 'utility-types';

const reactNativeMock: DeepPartial<typeof ReactNative> = {
    Dimensions: { get: () => ({ width: 100, height: 200, scale: 1, fontScale: 1 }) },
    Platform: { OS: 'ios', select: jest.fn() },
    I18nManager: { isRTL: false },
    StyleSheet: {
        create: (obj) =>
            Object.keys(obj).reduce((res: any, key, index) => {
                res[key] = index;
                return res;
            }, {}),
        flatten: (arr: any) => arr.reduce((res: any, item: any) => Object.assign(res, item), {}),
        hairlineWidth: 1,
    },
    View: jest.fn().mockReturnValue('View') as any,
    Text: jest.fn().mockReturnValue('Text'),
};

module.exports = reactNativeMock;
