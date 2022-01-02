/**
 * Style
 */
import { process } from './replacers/media-queries';
import { extract, get } from './replacers/vars';
import type { TRawGlobalVars } from './types/common';
import { excludeKeys } from './utils';
import { Value } from './value';

export class Style {
    private readonly source: TRawGlobalVars;
    private varsArr: any;
    private processedSource: any;
    private extractedVars: any;
    private extractedProps: any;
    private calculatedVars: any;
    private calculatedProps: any;

    /**
     * Constructor
     * @param {Object} source plain object style with variables
     * @param {Array} [varsArr] array of vars objects
     */
    public constructor(source: Readonly<TRawGlobalVars>, varsArr: any = []) {
        this.source = source;
        this.varsArr = varsArr;
        this.processedSource = null;
        this.extractedVars = null;
        this.extractedProps = null;
        this.calculatedVars = null;
        this.calculatedProps = null;
    }

    /**
     * Calculates style
     * @returns {Object}
     */
    public calc(): any {
        this.processSource();
        this.calcVars();
        this.calcProps();
        this.tryOutline();
        return {
            calculatedVars: this.calculatedVars,
            calculatedProps: this.calculatedProps,
        };
    }

    private processSource(): void {
        this.processedSource = process(this.source);
    }

    private calcVars(): void {
        this.extractedVars = extract(this.processedSource);
        if (this.extractedVars) {
            const varsArrForVars = [this.extractedVars].concat(this.varsArr);
            this.calculatedVars = calcPlainObject(this.extractedVars, varsArrForVars);
            this.varsArr = [this.calculatedVars].concat(this.varsArr);
        }
    }

    private calcProps(): void {
        this.extractedProps = excludeKeys(this.processedSource, this.extractedVars);
        this.calculatedProps = calcPlainObject(this.extractedProps, this.varsArr);
    }

    private tryOutline(): void {
        const outline = get('$outline', this.varsArr);
        if (outline) {
            this.calculatedProps.borderWidth = typeof outline === 'number' ? outline : 1;
            this.calculatedProps.borderColor = getRandomColor();
        }
    }
}

/**
 * Calculates values in plain object
 *
 * @param {Object} obj
 * @param {Array} varsArr
 * @returns {Object}
 */
const calcPlainObject = (obj: any, varsArr: any): any =>
    Object.keys(obj).reduce((res: any, prop) => {
        res[prop] = calcStyleValue(prop, obj[prop], varsArr);
        return res;
    }, {});

/**
 * Calculates single value
 * @param {String} prop
 * @param {*} value
 * @param {Array} varsArr
 */
const calcStyleValue = (prop: string, value: any, varsArr: any): Value => {
    if (value && typeof value === 'object') {
        return Array.isArray(value)
            ? value.map((obj) => calcPlainObject(obj, varsArr))
            : calcPlainObject(value, varsArr);
    }
    return new Value(value, prop, varsArr).calc();
};

/**
 * Returns random color (needed for outline)
 * @returns {String}
 */
const getRandomColor = (): string => {
    const colors = ['black', 'red', 'green', 'blue'],
        index = Math.round(Math.random() * (colors.length - 1));
    return colors[index];
};
