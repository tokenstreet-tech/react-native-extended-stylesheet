import scale from '../scale';

describe('scale', () => {
    it('should detect scale', () => {
        expect(scale.isScalable(1)).toBe(false);
        expect(scale.isScalable(1, 'prop')).toBe(false);
        expect(scale.isScalable(1, 'width')).toBe(true);
        expect(scale.isScalable(1, 'propWidth')).toBe(true);
    });

    it('should calc scale', () => {
        expect(scale.calc(2, 2)).toBe(4);
        expect(scale.calc(1, 0.5)).toBe(0.5);
    });

    it('should throw errors for invalid input', () => {
        expect(() => scale.calc('abc', 2)).toThrowError('Invalid value for scale: abc');
        expect(() => scale.calc(2, 'cde')).toThrowError('Invalid scaleFactor for scale: cde');
    });
});
