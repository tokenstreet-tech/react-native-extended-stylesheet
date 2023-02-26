/**
 * Extended StyleSheet API
 */
import { StyleSheet } from 'react-native';

import { child } from './child';
import { isMediaQuery } from './replacers/media-queries';
import { isVar } from './replacers/vars';
import { Sheet } from './sheet';
import { Style } from './style';
import type { TValueExpr } from './types/deperecatedCommon';
import type { TExtendedNamedStyles, TNamedStyles } from './types/extendedStyles';
import type { TGlobalVariables } from './types/globalVariables';
import { Value } from './value';

type TListener = () => void;

export class EStyleSheet {
    private static readonly BUILD_EVENT: string = 'build';

    // Proxy to original
    public flatten = StyleSheet.flatten;
    public compose = StyleSheet.compose;
    public setStyleAttributePreprocessor = StyleSheet.setStyleAttributePreprocessor;
    public hairlineWidth = StyleSheet.hairlineWidth;
    public absoluteFillObject = StyleSheet.absoluteFillObject;
    public absoluteFill = StyleSheet.absoluteFill;

    public child: typeof child;
    private builded: boolean;
    private readonly sheets: Array<Sheet<unknown>>;
    private globalVars: any;
    private readonly listeners: Record<string, never> | { [key in typeof EStyleSheet.BUILD_EVENT]: Array<TListener> };

    /**
     * Constructor
     */
    public constructor() {
        this.child = child;
        this.builded = false;
        this.sheets = [];
        this.globalVars = null;
        this.listeners = {};
    }

    private static assertSubscriptionParams(event: typeof EStyleSheet.BUILD_EVENT, listener: TListener): void {
        if (event !== EStyleSheet.BUILD_EVENT) {
            throw new Error(`Only '${EStyleSheet.BUILD_EVENT}' event is currently supported.`);
        }
        if (typeof listener !== 'function') {
            throw new Error('Listener should be a function.');
        }
    }

    /**
     * Creates extended stylesheet object that will be calculated after build
     * @param source Source style
     * @returns Extended stylesheet object
     */
    public create<T>(source: TExtendedNamedStyles<T>): TNamedStyles<T> {
        const sheet = new Sheet(source as any);
        // TODO: add options param to allow create dynamic stylesheets that should not be stored
        this.sheets.push(sheet);
        if (this.builded) {
            sheet.calc(this.globalVars);
        }
        return sheet.getResult();
    }

    /**
     * Calculates all stylesheets
     * @param globalVars Global variables for all stylesheets
     */
    public build<TGlobalVariablesObject>(globalVars?: TGlobalVariables<TGlobalVariablesObject>): void {
        this.builded = true;
        this.calcGlobalVars(globalVars);
        this.calcSheets();
        this.callListeners(EStyleSheet.BUILD_EVENT);
    }

    /**
     * Calculates particular expression. For some values you need to pass prop (e.g. percent)
     * @param expr Value
     * @param prop Property for which value is calculated. For example, to calculate percent values the function should know is it 'width' or 'height' to use proper reference value.
     * @returns Calculated result
     *
     * **Please note** that in most cases `EStyleSheet.value()` should be used inside function, not directly:
     *
     * ```jsx
     * const styles = EStyleSheet.create({
     *     button1: {
     *         width: () => EStyleSheet.value('$contentWidth') + 10, // <-- Correct!
     *     },
     *     button2: {
     *         width: EStyleSheet.value('$contentWidth') + 10, // <-- Incorrect. Because EStyleSheet.build() may occur later and $contentWidth will be undefined at this moment.
     *     },
     * });
     * ```
     */
    public value(expr: Readonly<TValueExpr>, prop?: string): any {
        const varsArr: any = this.globalVars ? [this.globalVars] : [];
        return new Value(expr, prop, varsArr).calc();
    }

    /**
     * Subscribe to event. Currently, only 'build' event is supported.
     * @param event
     * @param listener
     */
    public subscribe(event: typeof EStyleSheet.BUILD_EVENT, listener: TListener): void {
        EStyleSheet.assertSubscriptionParams(event, listener);
        this.listeners[EStyleSheet.BUILD_EVENT] = this.listeners[EStyleSheet.BUILD_EVENT] || [];
        this.listeners[EStyleSheet.BUILD_EVENT].push(listener);
        if (this.builded) {
            listener();
        }
    }

    /**
     * Unsubscribe from event. Currently, only 'build' event is supported.
     * @param event
     * @param listener
     */
    public unsubscribe(event: typeof EStyleSheet.BUILD_EVENT, listener: TListener): void {
        EStyleSheet.assertSubscriptionParams(event, listener);
        if (this.listeners[EStyleSheet.BUILD_EVENT]) {
            this.listeners[EStyleSheet.BUILD_EVENT] = this.listeners[EStyleSheet.BUILD_EVENT].filter(
                (item) => item !== listener
            );
        }
    }

    /**
     * Clears all cached styles.
     */
    public clearCache(): void {
        this.sheets.forEach((sheet: Readonly<Sheet<unknown>>) => sheet.clearCache());
    }

    // TODO: move global vars stuff to separate module
    private calcGlobalVars<TGlobalVariablesObject>(globalVars?: TGlobalVariables<TGlobalVariablesObject>): void {
        if (globalVars) {
            this.checkGlobalVars(globalVars);
            // $theme is system variable used for caching
            (globalVars as any).$theme = (globalVars as any).$theme ?? 'default';
            this.globalVars = new Style(globalVars as any, [globalVars]).calc().calculatedVars;
        }
    }

    private calcSheets(): void {
        this.sheets.forEach((sheet: Readonly<Sheet<unknown>>) => sheet.calc(this.globalVars));
    }

    private callListeners(event: typeof EStyleSheet.BUILD_EVENT): void {
        if (Array.isArray(this.listeners[event])) {
            this.listeners[event].forEach((listener) => listener());
        }
    }

    private checkGlobalVars<TGlobalVariablesObject>(
        globalVariablesObject: Readonly<TGlobalVariables<TGlobalVariablesObject>>
    ): void {
        Object.keys(globalVariablesObject).forEach((key) => {
            if (!isVar(key) && !isMediaQuery(key)) {
                throw new Error(
                    `EStyleSheet.build() params should contain global variables (start with $) ` +
                        `or media queries (start with @media). Got '${key}'.`
                );
            }
        });
    }
}
