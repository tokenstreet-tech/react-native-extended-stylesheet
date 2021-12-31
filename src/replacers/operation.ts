/**
 * Detects operation in string
 * Supports: '-', '*', '/', '+'
 */

export type TOperator = '-' | '*' | '/' | '+';

interface IOpInfo {
    v1?: number;
    v2?: number;
    operator: TOperator;
    pos?: number;
}

interface IOpInfoRaw extends Omit<IOpInfo, 'v1' | 'v2'> {
    v1?: string;
    v2?: string;
}

const operators: Record<TOperator, (v1: number, v2: number) => number> = {
    '*': (v1, v2) => v1 * v2,
    '+': (v1, v2) => v1 + v2,
    '-': (v1, v2) => v1 - v2,
    '/': (v1, v2) => v1 / v2,
};

/**
 * Is operation in string: '0.25 * $abc' => {operator: '*', v1: '0.25', v2: '$abc'}
 * @param {String} str
 */
export const isOperation = (str: string): IOpInfoRaw | boolean => {
    const opInfo = findOperator(str);
    if (opInfo) {
        opInfo.v1 = str.substr(0, opInfo.pos).trim();
        opInfo.v2 = str.substr((opInfo.pos ?? 0) + 1).trim();
        delete opInfo.pos;
        return opInfo;
    }
    return false;
};

/**
 * Executes operation
 * @param {Object} opInfo
 */
export const exec = (opInfo: Readonly<IOpInfo>) => {
    assertOperator(opInfo.operator);
    assertValue(opInfo.v1);
    assertValue(opInfo.v2);
    if (opInfo.operator === '/') {
        assertDivisor(opInfo.v2);
    }
    const fn = operators[opInfo.operator];
    // We can safely use number value because we already asserted it above
    return fn(opInfo.v1 as unknown as number, opInfo.v2 as unknown as number);
};

const findOperator = (str: string): IOpInfoRaw | undefined => {
    for (const operator in operators) {
        if (Object.prototype.hasOwnProperty.call(operators, operator)) {
            const pos = str.indexOf(operator);
            if (pos >= 0) {
                return { operator: operator as TOperator, pos };
            }
        }
    }
    return undefined;
};

const assertOperator = (operator: TOperator) => {
    if (!operators[operator]) {
        throw new Error(`Unknown operator: ${operator}`);
    }
};

const assertValue = (value?: number) => {
    if (typeof value !== 'number') {
        throw new Error(`Operation value should be number, you try: ${String(value)}`);
    }
};

const assertDivisor = (divisor?: number) => {
    if (divisor === 0) {
        throw new Error('Operation divisor should not be zero');
    }
};
