/**
 * Calculates particular value
 */

import rem from './replacers/rem';
import vars from './replacers/vars';
import percent from './replacers/percent';
import operation from './replacers/operation';
import scale from './replacers/scale';
import { TValueExpr } from './types/common';

export class Value {
    value: TValueExpr;
    outValue: any;
    prop: string;
    varsArr: any;
    stack: any;
    isOperation: boolean;

    /**
     * Constructor
     *
     * @param {*} value
     * @param {String} prop property for which valye is calculated
     * @param {Array} varsArr array of objects with vars
     * @param {Object} [options]
     * @param {Array} [options.stack] stack of calls when resolving variable
     * @param {Boolean} [options.isOperation] is value calculated inside operation
     */
    constructor(
        value: TValueExpr,
        prop: string,
        varsArr = [],
        options: { stack?: Array<any>; isOperation?: boolean } = {}
    ) {
        this.value = value;
        this.outValue = null;
        this.prop = prop;
        this.varsArr = varsArr;
        this.stack = options.stack || [];
        this.isOperation = options.isOperation !== undefined ? options.isOperation : false;
    }

    /**
     * Calculates value:
     * execute function, resolve var refs, convert string of (rem, percent) to pixels
     */
    calc() {
        if (typeof this.value === 'function') {
            this.value = this.value();
        }

        if (typeof this.value === 'string') {
            this.calcString();
        } else {
            this.proxyValue();
        }

        if (this.isFinal()) {
            this.applyScale();
        }

        return this.outValue;
    }

    /**
     * Calculates string
     * Here we do not calc direct percent values as they supported natively since RN 43 (#32).
     * But keep calculating percent for operands when value defined as operation.
     */
    calcString() {
        const actions = [
                this.tryCalcOperation,
                this.isOperation ? this.tryCalcPercent : null,
                this.tryCalcVar,
                this.tryCalcRem,
            ].filter(Boolean),
            value = this.tryActions(actions, this.value);
        if (value !== null) {
            this.outValue = value;
        } else {
            this.proxyValue();
        }
    }

    /**
     * Applies array of calculations to value. Stops on the first calculation that returns not null.
     * @param {Array} actions
     * @param {String} str
     */
    tryActions(actions: any, str: any) {
        // TODO: use for.. of after https://github.com/facebook/react-native/issues/4676
        for (let i = 0; i < actions.length; i += 1) {
            const val = actions[i].call(this, str);
            if (val !== null) {
                return val;
            }
        }
        return null;
    }

    tryCalcOperation(str: any) {
        const opInfo = operation.isOperation(str);
        if (!opInfo) {
            return null;
        }
        this.isOperation = true;
        // TODO: use for.. of after https://github.com/facebook/react-native/issues/4676
        const operands = ['v1', 'v2'];
        for (let i = 0; i < operands.length; i += 1) {
            const operand = operands[i],
                operandValue = this.calcOperandValue(opInfo[operand]);
            if (operandValue !== null) {
                opInfo[operand] = operandValue;
            } else {
                // If we cant calculate operand - it is not operation, see #3
                return null;
            }
        }
        return operation.exec(opInfo);
    }

    calcOperandValue(str: any) {
        const actions = [this.tryCalcVar, this.tryCalcPercent, this.tryCalcRem, this.tryCalcFloat];
        return this.tryActions(actions, str);
    }

    tryCalcVar(str: any) {
        if (vars.isVar(str)) {
            const val = vars.calc(str, this.varsArr);
            if (this.stack.indexOf(str) >= 0) {
                throw new Error(`Cyclic reference: ${this.stack.concat([str]).join(' -> ')}`);
            }
            const options = {
                stack: this.stack.concat([str]),
                isOperation: this.isOperation,
            };
            // Recursive call because var can link to another var or percent/rem
            return new Value(val, str, this.varsArr, options).calc();
        }
        return null;
    }

    /**
     * Tries calc percent
     */
    tryCalcPercent(str: any) {
        if (percent.isPercent(str)) {
            return percent.calc(str, this.prop);
        }
        return null;
    }

    /**
     * Tries calc rem
     */
    tryCalcRem(str: any) {
        if (rem.isRem(str)) {
            const remValue = vars.get('$rem', this.varsArr);
            return rem.calc(str, remValue);
        }
        return null;
    }

    /**
     * Tries calc float value from string
     */
    tryCalcFloat(str: any) {
        const val = parseFloat(str);
        return !isNaN(val) ? val : null;
    }

    /**
     * Is it final calculation (not recursion)
     */
    isFinal() {
        return !this.stack.length;
    }

    /**
     * Just proxies value when no processing needed
     */
    proxyValue() {
        this.outValue = this.value;
    }

    applyScale() {
        /*
         * Do not apply scale to variables, only for final numbers
         * otherwise scale will be applied several times
         */
        if (vars.isVar(this.prop)) {
            return;
        }
        const scaleFactor = vars.get('$scale', this.varsArr) || 1;
        if (scaleFactor === 1) {
            return;
        }
        if (scale.isScalable(this.outValue, this.prop)) {
            this.outValue = scale.calc(this.outValue, scaleFactor);
        }
    }
}
