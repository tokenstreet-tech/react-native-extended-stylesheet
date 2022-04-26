/**
 * Calculates particular value
 */
import { exec, isOperation } from './replacers/operation';
import { calc as percentCalc, isPercent } from './replacers/percent';
import { calc as remCalc, isRem } from './replacers/rem';
import { calc as scaleCalc, isScalable } from './replacers/scale';
import { calc as varsCalc, get, isVar } from './replacers/vars';
import type { TValueExpr } from './types/deperecatedCommon';

type TAction = (str: string) => number | null;

export class Value {
    private value: TValueExpr;
    private outValue: any;
    private readonly prop?: string;
    private readonly varsArr: any;
    private readonly stack: any;
    private isOperation: boolean;

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
    public constructor(
        value: Readonly<TValueExpr>,
        prop?: string,
        varsArr: Readonly<Array<any>> = [],
        options: Readonly<{ readonly stack?: Readonly<Array<any>>; readonly isOperation?: boolean }> = {}
    ) {
        this.value = value;
        this.outValue = null;
        this.prop = prop;
        this.varsArr = varsArr;
        this.stack = options.stack ?? [];
        this.isOperation = options.isOperation === undefined ? false : options.isOperation;
    }

    /**
     * Calculates value:
     * execute function, resolve var refs, convert string of (rem, percent) to pixels
     */
    public calc(): any {
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
    private calcString(): void {
        const actions: Array<TAction> = [
                this.tryCalcOperation,
                this.isOperation ? this.tryCalcPercent : null,
                this.tryCalcVar,
                this.tryCalcRem,
            ].filter(Boolean) as Array<TAction>,
            value = this.tryActions(actions, this.value);
        if (value === null) {
            this.proxyValue();
        } else {
            this.outValue = value;
        }
    }

    /**
     * Applies array of calculations to value. Stops on the first calculation that returns not null.
     * @param {Array} actions
     * @param {String} str
     */
    private tryActions(actions: Readonly<Array<TAction>>, str: any): number | null {
        for (const action of actions) {
            const val = action.call(this, str);
            if (val !== null) {
                return val;
            }
        }
        return null;
    }

    private tryCalcOperation(str: string): number | null {
        const opInfo = isOperation(str);
        if (!opInfo) {
            return null;
        }
        this.isOperation = true;

        for (const operand of ['v1', 'v2']) {
            const operandValue = this.calcOperandValue((opInfo as any)[operand]);
            if (operandValue === null) {
                // If we cant calculate operand - it is not operation, see #3
                return null;
            }
            (opInfo as any)[operand] = operandValue;
        }
        return exec(opInfo as any);
    }

    private calcOperandValue(str: string): number | null {
        const actions = [this.tryCalcVar, this.tryCalcPercent, this.tryCalcRem, this.tryCalcFloat];
        return this.tryActions(actions, str);
    }

    private tryCalcVar(str: string): number | null {
        if (isVar(str)) {
            const val = varsCalc(str, this.varsArr);
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
    private tryCalcPercent(str: string): number | null {
        if (isPercent(str)) {
            return percentCalc(str, this.prop);
        }
        return null;
    }

    /**
     * Tries calc rem
     */
    private tryCalcRem(str: string): number | null {
        if (isRem(str)) {
            const remValue = get('$rem', this.varsArr);
            return remCalc(str, remValue);
        }
        return null;
    }

    /**
     * Tries calc float value from string
     */
    private tryCalcFloat(str: string): number | null {
        const val = parseFloat(str);
        return isNaN(val) ? null : val;
    }

    /**
     * Is it final calculation (not recursion)
     */
    private isFinal(): boolean {
        return !this.stack.length;
    }

    /**
     * Just proxies value when no processing needed
     */
    private proxyValue(): void {
        this.outValue = this.value;
    }

    private applyScale(): void {
        /*
         * Do not apply scale to variables, only for final numbers
         * otherwise scale will be applied several times
         */
        if (isVar(this.prop)) {
            return;
        }
        const scaleFactor = get('$scale', this.varsArr) || 1;
        if (scaleFactor === 1) {
            return;
        }
        if (isScalable(this.outValue, this.prop)) {
            this.outValue = scaleCalc(this.outValue, scaleFactor);
        }
    }
}
