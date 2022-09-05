import { calc, isScalable } from '../scale';

describe('scale', () => {
    it('should detect scale', () => {
        expect(isScalable(1)).toBe(false);
        expect(isScalable(1, 'prop')).toBe(false);
        expect(isScalable(1, 'width')).toBe(true);
        expect(isScalable(1, 'propWidth')).toBe(true);
    });

    it('should calc scale', () => {
        expect(calc(2, 2)).toBe(4);
        expect(calc(1, 0.5)).toBe(0.5);
    });

    it('should throw errors for invalid input', () => {
        expect(() => calc('abc' as unknown as number, 2)).toThrow('Invalid value for scale: abc');
        expect(() => calc(2, 'cde' as unknown as number)).toThrow('Invalid scaleFactor for scale: cde');
    });
});
