/**
 * Extended StyleSheet API
 */
import { StyleSheet } from 'react-native';

import { child } from './child';
import { isMediaQuery } from './replacers/media-queries';
import { isVar } from './replacers/vars';
import { Sheet } from './sheet';
import { Style } from './style';
import type { EStyleSet, StyleSet, TValueExpr } from './types/common';
import { Value } from './value';

type TListener = () => void;

const BUILD_EVENT = 'build';

export class EStyleSheet {
    // @ts-expect-error Implemented through method _proxyToOriginal
    public setStyleAttributePreprocessor: typeof StyleSheet.setStyleAttributePreprocessor;
    // @ts-expect-error Implemented through method _proxyToOriginal
    public hairlineWidth: typeof StyleSheet.hairlineWidth;
    // @ts-expect-error Implemented through method _proxyToOriginal
    public absoluteFill: typeof StyleSheet.absoluteFill;
    // @ts-expect-error Implemented through method _proxyToOriginal
    public absoluteFillObject: typeof StyleSheet.absoluteFillObject;
    // @ts-expect-error Implemented through method _proxyToOriginal
    public flatten: typeof StyleSheet.flatten;

    public child: typeof child;
    private builded: boolean;
    private readonly sheets: Array<Sheet<unknown>>;
    private globalVars: any;
    private listeners: Record<string, never> | { [key in typeof BUILD_EVENT]: Array<TListener> };

    /**
     * Constructor
     */
    public constructor() {
        this.child = child;
        this.builded = false;
        this.sheets = [];
        this.globalVars = null;
        this.listeners = {};
        this.proxyToOriginal();
    }

    private static assertSubscriptionParams(event: typeof BUILD_EVENT, listener: TListener): void {
        if (event !== BUILD_EVENT) {
            throw new Error(`Only '${BUILD_EVENT}' event is currently supported.`);
        }
        if (typeof listener !== 'function') {
            throw new Error('Listener should be a function.');
        }
    }

    /**
     * Creates stylesheet that will be calculated after build
     * @param {Object} obj
     * @returns {Object}
     */
    public create<T = EStyleSet>(obj: EStyleSet<T>): StyleSet<T> {
        const sheet = new Sheet(obj as any);
        // TODO: add options param to allow create dynamic stylesheets that should not be stored
        this.sheets.push(sheet);
        if (this.builded) {
            sheet.calc(this.globalVars);
        }
        return sheet.getResult();
    }

    /**
     * Builds all created stylesheets with passed variables
     * @param {Object} [rawGlobalVars]
     */
    public build<T>(rawGlobalVars?: T): void {
        this.builded = true;
        this.calcGlobalVars(rawGlobalVars);
        this.calcSheets();
        this.callListeners(BUILD_EVENT);
    }

    /**
     * Calculates particular value. For some values you need to pass prop (e.g. percent)
     * @param {*} expr
     * @param {String} [prop]
     * @returns {*}
     */
    public value(expr: TValueExpr, prop?: string) {
        const varsArr: any = this.globalVars ? [this.globalVars] : [];
        return new Value(expr, prop, varsArr).calc();
    }

    /**
     * Subscribe to event. Currently only 'build' event is supported.
     * @param {String} event
     * @param {Function} listener
     */
    public subscribe(event: typeof BUILD_EVENT, listener: TListener) {
        EStyleSheet.assertSubscriptionParams(event, listener);
        this.listeners[BUILD_EVENT] = this.listeners[BUILD_EVENT] || [];
        this.listeners[BUILD_EVENT].push(listener);
        if (this.builded) {
            listener();
        }
    }

    /**
     * Unsubscribe from event. Currently only 'build' event is supported.
     * @param {String} event
     * @param {Function} listener
     */
    public unsubscribe(event: typeof BUILD_EVENT, listener: TListener) {
        EStyleSheet.assertSubscriptionParams(event, listener);
        if (this.listeners[BUILD_EVENT]) {
            this.listeners[BUILD_EVENT] = this.listeners[BUILD_EVENT].filter((item) => item !== listener);
        }
    }

    /**
     * Clears all cached styles.
     */
    public clearCache(): void {
        this.sheets.forEach((sheet: Readonly<Sheet<unknown>>) => sheet.clearCache());
    }

    // TODO: move global vars stuff to separate module
    private calcGlobalVars<T>(rawGlobalVars?: T): void {
        if (rawGlobalVars) {
            this.checkGlobalVars(rawGlobalVars);
            // $theme is system variable used for caching
            (rawGlobalVars as any).$theme = (rawGlobalVars as any).$theme ?? 'default';
            this.globalVars = new Style(rawGlobalVars as any, [rawGlobalVars]).calc().calculatedVars;
        }
    }

    private calcSheets() {
        this.sheets.forEach((sheet: Readonly<Sheet<unknown>>) => sheet.calc(this.globalVars));
    }

    private callListeners(event: typeof BUILD_EVENT) {
        if (Array.isArray(this.listeners[event])) {
            this.listeners[event].forEach((listener) => listener());
        }
    }

    private proxyToOriginal() {
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

    private checkGlobalVars<T>(rawGlobalVars: T): void {
        Object.keys(rawGlobalVars).forEach((key) => {
            if (!isVar(key) && !isMediaQuery(key)) {
                throw new Error(
                    `EStyleSheet.build() params should contain global variables (start with $) ` +
                        `or media queries (start with @media). Got '${key}'.`
                );
            }
        });
    }
}
