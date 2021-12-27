import percent from '../percent';

describe('percent', () => {
    it('should detect percent', () => {
        expect(percent.isPercent('10%')).toBe(true);
        expect(percent.isPercent('10')).toBe(false);
    });

    it('should calc vertical percent', () => {
        expect(percent.calc('10%', 'height')).toBe(20);
        expect(percent.calc('10%', 'Top')).toBe(20);
    });

    it('should calc horizontal percent', () => {
        expect(percent.calc('10%', 'width')).toBe(10);
        expect(percent.calc('10%', 'left')).toBe(10);
    });

    it('should throw error for invalid prop', () => {
        expect(() => percent.calc('10%', 'abc')).toThrowError(
            [
                `Name of variable or property with percent value should contain `,
                `(height,top,bottom,vertical,width,left,right,horizontal) to define base for percent calculation`,
            ].join('')
        );
    });
});
