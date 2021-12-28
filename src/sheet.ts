import { StyleSheet } from 'react-native';

import { process } from './replacers/media-queries';
import { extract } from './replacers/vars';
import { Style } from './style';
import type { StyleObject } from './types/common';
import { excludeKeys } from './utils';

export class Sheet<T> {
    private readonly source: StyleObject<T>;
    private result: any;
    private readonly cache: any;
    private nativeSheet: any;
    private globalVars: any;
    private localVars: any;
    private allVars: any;
    private processedSource: any;

    /**
     * Constructor
     * @param {Object} source
     */
    public constructor(source: StyleObject<T>) {
        this.source = source;
        this.result = {};
        // Cache result for each theme
        this.cache = new Map();
        this.nativeSheet = {};
        this.globalVars = null;
        this.localVars = null;
        this.allVars = null;
        this.processedSource = null;
    }

    /**
     * Calculates sheet and update result
     * @param {Object} globalVars
     */
    public calc(globalVars?: any) {
        this.globalVars = globalVars;
        this.clearResult();
        if (this.hasCache()) {
            this.applyCache();
        } else {
            this.processMediaQueries();
            this.calcVars();
            this.calcStyles();
            this.calcNative();
            this.storeCache();
        }
        return this.getResult();
    }

    public getResult() {
        return this.result;
    }

    public clearCache() {
        this.cache.clear();
    }

    private processMediaQueries() {
        this.processedSource = process(this.source);
    }

    private calcVars() {
        const rawLocalVars = extract(this.processedSource);
        if (rawLocalVars) {
            this.localVars = new Style(rawLocalVars, [rawLocalVars, this.globalVars]).calc().calculatedVars;
            Object.assign(this.result, this.localVars);
        } else {
            this.localVars = null;
        }
        this.allVars = [this.localVars, this.globalVars].filter(Boolean);
    }

    private calcStyles() {
        const extractedStyles = excludeKeys(this.processedSource, this.localVars);
        Object.keys(extractedStyles).forEach((key) => {
            let styles = extractedStyles[key];
            if (typeof styles === 'function') {
                styles = styles();
            }
            if (styles && typeof styles === 'object') {
                this.calcStyle(key, styles);
            } else {
                // Copy primitive values to result as-is
                this.result[key] = styles;
            }
        });
    }

    private calcStyle(key: string, styleProps: any) {
        const style = new Style(styleProps, this.allVars),
            { calculatedProps, calculatedVars } = style.calc(),
            merged = { ...calculatedVars, ...calculatedProps };
        if (key.startsWith('_')) {
            this.result[key] = merged;
        } else {
            this.result[`_${key}`] = merged;
            this.nativeSheet[key] = calculatedProps;
        }
    }

    private calcNative() {
        if (Object.keys(this.nativeSheet).length) {
            const rnStyleSheet = StyleSheet.create(this.nativeSheet);
            Object.assign(this.result, rnStyleSheet);
        }
    }

    private clearResult() {
        Object.keys(this.result).forEach((key) => delete this.result[key]);
    }

    private hasCache() {
        const key = this.getCacheKey();
        return key && this.cache.has(key);
    }

    private applyCache() {
        const cachedResult = this.cache.get(this.getCacheKey());
        Object.assign(this.result, cachedResult);
    }

    private storeCache() {
        const key = this.getCacheKey();
        if (key) {
            this.cache.set(key, { ...this.result });
        }
    }

    private getCacheKey() {
        return this.globalVars?.$theme;
    }
}
