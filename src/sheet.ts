import { StyleSheet } from 'react-native';
import { Style } from './style';
import { excludeKeys } from './utils';
import vars from './replacers/vars';
import mediaQueries from './replacers/media-queries';
import { StyleObject } from './types/common';

export class Sheet<T> {
    source: StyleObject<T>;
    result: any;
    cache: any;
    nativeSheet: any;
    globalVars: any;
    localVars: any;
    allVars: any;
    processedSource: any;

    /**
     * Constructor
     * @param {Object} source
     */
    constructor(source: StyleObject<T>) {
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
    public calc(globalVars: any) {
        this.globalVars = globalVars;
        this._clearResult();
        if (this._hasCache()) {
            this._applyCache();
        } else {
            this._processMediaQueries();
            this._calcVars();
            this._calcStyles();
            this._calcNative();
            this._storeCache();
        }
        return this.getResult();
    }

    private _processMediaQueries() {
        this.processedSource = mediaQueries.process(this.source);
    }

    private _calcVars() {
        const rawLocalVars = vars.extract(this.processedSource);
        if (rawLocalVars) {
            this.localVars = new Style(rawLocalVars, [rawLocalVars, this.globalVars]).calc().calculatedVars;
            Object.assign(this.result, this.localVars);
        } else {
            this.localVars = null;
        }
        this.allVars = [this.localVars, this.globalVars].filter(Boolean);
    }

    private _calcStyles() {
        const extractedStyles = excludeKeys(this.processedSource, this.localVars);
        Object.keys(extractedStyles).forEach((key) => {
            let styles = extractedStyles[key];
            if (typeof styles === 'function') {
                styles = styles();
            }
            if (styles && typeof styles === 'object') {
                this._calcStyle(key, styles);
            } else {
                // Copy primitive values to result as-is
                this.result[key] = styles;
            }
        });
    }

    private _calcStyle(key: string, styleProps: any) {
        const style = new Style(styleProps, this.allVars),
            { calculatedProps, calculatedVars } = style.calc(),
            merged = { ...calculatedVars, ...calculatedProps };
        if (key.charAt(0) === '_') {
            this.result[key] = merged;
        } else {
            this.result[`_${key}`] = merged;
            this.nativeSheet[key] = calculatedProps;
        }
    }

    private _calcNative() {
        if (Object.keys(this.nativeSheet).length) {
            const rnStyleSheet = StyleSheet.create(this.nativeSheet);
            Object.assign(this.result, rnStyleSheet);
        }
    }

    public getResult() {
        return this.result;
    }

    private _clearResult() {
        Object.keys(this.result).forEach((key) => delete this.result[key]);
    }

    private _hasCache() {
        const key = this._getCacheKey();
        return key && this.cache.has(key);
    }

    private _applyCache() {
        const cachedResult = this.cache.get(this._getCacheKey());
        Object.assign(this.result, cachedResult);
    }

    private _storeCache() {
        const key = this._getCacheKey();
        if (key) {
            this.cache.set(key, { ...this.result });
        }
    }

    public clearCache() {
        this.cache.clear();
    }

    private _getCacheKey() {
        return this.globalVars && this.globalVars.$theme;
    }
}
