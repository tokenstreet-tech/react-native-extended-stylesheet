/**
 * Extended StyleSheet API
 */

import { StyleSheet } from 'react-native';
import { Sheet } from './sheet';
import { Style } from './style';
import { Value } from './value';
import vars from './replacers/vars';
import mq from './replacers/media-queries';
import { child } from './child';
import { StyleObject, TRawGlobalVars, TValueExpr } from './types/common';

type TListener = () => void;

const BUILD_EVENT = 'build';

export class EStyleSheet {
    public child: typeof child;
    private _builded: boolean;
    private _sheets: Array<Sheet<unknown>>;
    private _globalVars: any;
    private _listeners: { [key in typeof BUILD_EVENT]: Array<TListener> } | Record<string, never>;

    /**
     * Constructor
     */
    constructor() {
        this.child = child;
        this._builded = false;
        this._sheets = [];
        this._globalVars = null;
        this._listeners = {};
        this._proxyToOriginal();
    }

    /**
     * Creates stylesheet that will be calculated after build
     * @param {Object} obj
     * @returns {Object}
     */
    public create<T>(obj: StyleObject<T>): T {
        const sheet = new Sheet(obj);
        // TODO: add options param to allow create dynamic stylesheets that should not be stored
        this._sheets.push(sheet);
        if (this._builded) {
            sheet.calc(this._globalVars);
        }
        return sheet.getResult();
    }

    /**
     * Builds all created stylesheets with passed variables
     * @param {Object} [rawGlobalVars]
     */
    public build(rawGlobalVars: TRawGlobalVars) {
        this._builded = true;
        this._calcGlobalVars(rawGlobalVars);
        this._calcSheets();
        this._callListeners(BUILD_EVENT);
    }

    /**
     * Calculates particular value. For some values you need to pass prop (e.g. percent)
     * @param {*} expr
     * @param {String} [prop]
     * @returns {*}
     */
    public value(expr: TValueExpr, prop: string) {
        const varsArr: any = this._globalVars ? [this._globalVars] : [];
        return new Value(expr, prop, varsArr).calc();
    }

    /**
     * Subscribe to event. Currently only 'build' event is supported.
     * @param {String} event
     * @param {Function} listener
     */
    public subscribe(event: typeof BUILD_EVENT, listener: TListener) {
        EStyleSheet._assertSubscriptionParams(event, listener);
        this._listeners[BUILD_EVENT] = this._listeners[BUILD_EVENT] || [];
        this._listeners[BUILD_EVENT].push(listener);
        if (this._builded) {
            listener();
        }
    }

    /**
     * Unsubscribe from event. Currently only 'build' event is supported.
     * @param {String} event
     * @param {Function} listener
     */
    public unsubscribe(event: typeof BUILD_EVENT, listener: TListener) {
        EStyleSheet._assertSubscriptionParams(event, listener);
        if (this._listeners[BUILD_EVENT]) {
            this._listeners[BUILD_EVENT] = this._listeners[BUILD_EVENT].filter((item) => item !== listener);
        }
    }

    /**
     * Clears all cached styles.
     */
    public clearCache(): void {
        this._sheets.forEach((sheet) => sheet.clearCache());
    }

    // TODO: move global vars stuff to separate module
    private _calcGlobalVars(rawGlobalVars: TRawGlobalVars) {
        if (rawGlobalVars) {
            this._checkGlobalVars(rawGlobalVars);
            // $theme is system variable used for caching
            rawGlobalVars.$theme = rawGlobalVars.$theme || 'default';
            this._globalVars = new Style(rawGlobalVars, [rawGlobalVars]).calc().calculatedVars;
        }
    }

    private _calcSheets() {
        this._sheets.forEach((sheet) => sheet.calc(this._globalVars));
    }

    private _callListeners(event: typeof BUILD_EVENT) {
        if (Array.isArray(this._listeners[event])) {
            this._listeners[event].forEach((listener) => listener());
        }
    }

    private _proxyToOriginal() {
        // See: https://facebook.github.io/react-native/docs/stylesheet.html
        const props: Array<keyof typeof StyleSheet> = [
            'setStyleAttributePreprocessor',
            'hairlineWidth',
            'absoluteFill',
            'absoluteFillObject',
            'flatten',
        ];
        props.forEach((prop) => {
            Object.defineProperty(this, prop, {
                get: () => StyleSheet[prop],
                enumerable: true,
            });
        });
    }

    private _checkGlobalVars(rawGlobalVars: TRawGlobalVars): void {
        Object.keys(rawGlobalVars).forEach((key) => {
            if (!vars.isVar(key) && !mq.isMediaQuery(key)) {
                throw new Error(
                    `EStyleSheet.build() params should contain global variables (start with $) ` +
                        `or media queries (start with @media). Got '${key}'.`
                );
            }
        });
    }

    private static _assertSubscriptionParams(event: typeof BUILD_EVENT, listener: TListener): void {
        if (event !== BUILD_EVENT) {
            throw new Error(`Only '${BUILD_EVENT}' event is currently supported.`);
        }
        if (typeof listener !== 'function') {
            throw new Error('Listener should be a function.');
        }
    }
}
