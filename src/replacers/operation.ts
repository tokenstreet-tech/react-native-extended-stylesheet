/**
 * Detects operation in string
 * Supports: '*', '+', '-'
 */

const operators: any = {
    '*': (v1: any, v2: any) => v1 * v2,
    '+': (v1: any, v2: any) => v1 + v2,
    '-': (v1: any, v2: any) => v1 - v2,
    '/': (v1: any, v2: any) => v1 / v2,
};

/**
 * Is operation in string: '0.25 * $abc' => {operator: '*', v1: '0.25', v2: '$abc'}
 * @param {String} str
 */
export const isOperation = (str: string) => {
    const opInfo = findOperator(str);
    if (opInfo) {
        opInfo.v1 = str.substr(0, opInfo.pos).trim();
        opInfo.v2 = str.substr(opInfo.pos + 1).trim();
        delete opInfo.pos;
        return opInfo;
    }
    return false;
};

/**
 * Executes operation
 * @param {Object} opInfo
 */
export const exec = (opInfo: any) => {
    assertOperator(opInfo.operator);
    assertValue(opInfo.v1);
    assertValue(opInfo.v2);
    if (opInfo.operator === '/') {
        assertDivisor(opInfo.v2);
    }
    const fn = operators[opInfo.operator];
    return fn(opInfo.v1, opInfo.v2);
};

const findOperator = (str: any): any => {
    for (const operator in operators) {
        const pos = str.indexOf(operator);
        if (pos >= 0) {
            return { operator, pos };
        }
    }
};

const assertOperator = (operator: any) => {
    if (!operators[operator]) {
        throw new Error(`Unknown operator: ${operator}`);
    }
};

const assertValue = (value: any) => {
    if (typeof value !== 'number') {
        throw new Error(`Operation value should be number, you try: ${String(value)}`);
    }
};

const assertDivisor = (divisor: any) => {
    if (divisor === 0) {
        throw new Error('Operation divisor should not be zero');
    }
};
