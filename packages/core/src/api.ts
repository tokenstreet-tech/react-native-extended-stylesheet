/**
 * Extended StyleSheet API
 */
import { StyleSheet } from 'react-native';
import type { TValueExpr } from './types/deperecatedCommon';
import { child } from './child';
import { isMediaQuery } from './replacers/media-queries';
import { isVar } from './replacers/vars';
import { Sheet } from './sheet';
import { Style } from './style';
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
     * Creates stylesheet that will be calculated after build
     * @param styles
     */
    public create<T>(styles: TExtendedNamedStyles<T>): TNamedStyles<T> {
        const sheet = new Sheet(styles as any);
        // TODO: add options param to allow create dynamic stylesheets that should not be stored
        this.sheets.push(sheet);
        if (this.builded) {
            sheet.calc(this.globalVars);
        }
        return sheet.getResult();
    }

    /**
     * Builds all created stylesheets with passed variables
     * @param globalVariablesObject
     */
    public build<TGlobalVariablesObject>(globalVariablesObject?: TGlobalVariables<TGlobalVariablesObject>): void {
        this.builded = true;
        this.calcGlobalVars(globalVariablesObject);
        this.calcSheets();
        this.callListeners(EStyleSheet.BUILD_EVENT);
    }

    /**
     * Calculates particular value. For some values you need to pass prop (e.g. percent)
     * @param expr
     * @param prop
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
    private calcGlobalVars<TGlobalVariablesObject>(
        globalVariablesObject?: TGlobalVariables<TGlobalVariablesObject>
    ): void {
        if (globalVariablesObject) {
            this.checkGlobalVars(globalVariablesObject);
            // $theme is system variable used for caching
            (globalVariablesObject as any).$theme = (globalVariablesObject as any).$theme ?? 'default';
            this.globalVars = new Style(globalVariablesObject as any, [globalVariablesObject]).calc().calculatedVars;
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
