import type { TMathOperator } from '../operation';
import { exec, isOperation } from '../operation';

describe('operation', () => {
    it('should detect *', () => {
        expect(isOperation('10 * 20')).toEqual({ operator: '*', v1: '10', v2: '20' });
        expect(isOperation('$abc*100%')).toEqual({ operator: '*', v1: '$abc', v2: '100%' });
    });

    it('should detect +', () => {
        expect(isOperation('10 + 20')).toEqual({ operator: '+', v1: '10', v2: '20' });
        expect(isOperation('$abc+100%')).toEqual({ operator: '+', v1: '$abc', v2: '100%' });
    });

    it('should detect -', () => {
        expect(isOperation('10 - 20')).toEqual({ operator: '-', v1: '10', v2: '20' });
        expect(isOperation('$abc-100%')).toEqual({ operator: '-', v1: '$abc', v2: '100%' });
    });

    it('should detect /', () => {
        expect(isOperation('10 / 20')).toEqual({ operator: '/', v1: '10', v2: '20' });
        expect(isOperation('$abc/100%')).toEqual({ operator: '/', v1: '$abc', v2: '100%' });
    });

    it('should return false for non-operation', () => {
        expect(isOperation('$abc^100%')).toBe(false);
    });

    it('should exec *', () => {
        expect(exec({ operator: '*', v1: 10, v2: 0.5 })).toBe(5);
    });

    it('should exec +', () => {
        expect(exec({ operator: '+', v1: 10, v2: 0.5 })).toBe(10.5);
    });

    it('should exec -', () => {
        expect(exec({ operator: '-', v1: 10, v2: 0.5 })).toBe(9.5);
    });

    it('should exec /', () => {
        expect(exec({ operator: '/', v1: 10, v2: 0.5 })).toBe(20);
    });

    it('should throw on invalid data', () => {
        expect(() => exec({ operator: 'a' as unknown as TMathOperator, v1: 10, v2: 0.5 })).toThrow(
            'Unknown operator: a'
        );
        expect(() => exec({ operator: '+', v1: '10' as unknown as number, v2: 0.5 })).toThrow(
            'Operation value should be number, you try: 10'
        );
        expect(() => exec({ operator: '/', v1: 10, v2: 0 })).toThrow('Operation divisor should not be zero');
        expect(() => exec({ operator: '+', v1: 10, v2: null as unknown as number })).toThrow(
            'Operation value should be number, you try: null'
        );
    });
});
