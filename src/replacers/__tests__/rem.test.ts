import { calc, isRem } from '../rem';

describe('rem', () => {
    it('should detect rem', () => {
        expect(isRem('2rem')).toBe(true);
        expect(isRem('abc-em')).toBe(false);
    });
    it('should calc rem-string', () => {
        expect(calc('1.5rem', 10)).toBe(15);
        expect(calc('rem', 10)).toBe(10);
    });
    it('should throw error for invalid koef', () => {
        expect(() => {
            calc('abcrem', 10);
        }).toThrowError('Invalid rem value: abcrem');
    });
});
