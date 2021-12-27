/**
 * Style
 */

import vars from './replacers/vars';
import mediaQueries from './replacers/media-queries';
import { Value } from './value';
import { excludeKeys } from './utils';
import { TRawGlobalVars } from './types/common';

export class Style {
    source: TRawGlobalVars;
    varsArr: any;
    processedSource: any;
    extractedVars: any;
    extractedProps: any;
    calculatedVars: any;
    calculatedProps: any;

    /**
     * Constructor
     * @param {Object} source plain object style with variables
     * @param {Array} [varsArr] array of vars objects
     */
    constructor(source: TRawGlobalVars, varsArr: any = []) {
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
    calc() {
        this.processSource();
        this.calcVars();
        this.calcProps();
        this.tryOutline();
        return {
            calculatedVars: this.calculatedVars,
            calculatedProps: this.calculatedProps,
        };
    }

    processSource() {
        this.processedSource = mediaQueries.process(this.source);
    }

    calcVars() {
        this.extractedVars = vars.extract(this.processedSource);
        if (this.extractedVars) {
            const varsArrForVars = [this.extractedVars].concat(this.varsArr);
            this.calculatedVars = calcPlainObject(this.extractedVars, varsArrForVars);
            this.varsArr = [this.calculatedVars].concat(this.varsArr);
        }
    }

    calcProps() {
        this.extractedProps = excludeKeys(this.processedSource, this.extractedVars);
        this.calculatedProps = calcPlainObject(this.extractedProps, this.varsArr);
    }

    tryOutline() {
        const outline = vars.get('$outline', this.varsArr);
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
const calcPlainObject = (obj: any, varsArr: any) =>
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
const calcStyleValue = (prop: string, value: any, varsArr: any) => {
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
const getRandomColor = () => {
    const colors = ['black', 'red', 'green', 'blue'],
        index = Math.round(Math.random() * (colors.length - 1));
    return colors[index];
};
