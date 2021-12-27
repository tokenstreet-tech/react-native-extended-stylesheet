import rem from '../rem';

describe('rem', () => {
    it('should detect rem', () => {
        expect(rem.isRem('2rem')).toBe(true);
        expect(rem.isRem('abc-em')).toBe(false);
    });
    it('should calc rem-string', () => {
        expect(rem.calc('1.5rem', 10)).toBe(15);
        expect(rem.calc('rem', 10)).toBe(10);
    });
    it('should throw error for invalid koef', () => {
        expect(() => {
            rem.calc('abcrem', 10);
        }).toThrowError('Invalid rem value: abcrem');
    });
});
