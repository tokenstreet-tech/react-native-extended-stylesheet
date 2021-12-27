import operation from '../operation';

describe('operation', () => {
    it('should detect *', () => {
        expect(operation.isOperation('10 * 20')).toEqual({ operator: '*', v1: '10', v2: '20' });
        expect(operation.isOperation('$abc*100%')).toEqual({ operator: '*', v1: '$abc', v2: '100%' });
    });

    it('should detect +', () => {
        expect(operation.isOperation('10 + 20')).toEqual({ operator: '+', v1: '10', v2: '20' });
        expect(operation.isOperation('$abc+100%')).toEqual({ operator: '+', v1: '$abc', v2: '100%' });
    });

    it('should detect -', () => {
        expect(operation.isOperation('10 - 20')).toEqual({ operator: '-', v1: '10', v2: '20' });
        expect(operation.isOperation('$abc-100%')).toEqual({ operator: '-', v1: '$abc', v2: '100%' });
    });

    it('should detect /', () => {
        expect(operation.isOperation('10 / 20')).toEqual({ operator: '/', v1: '10', v2: '20' });
        expect(operation.isOperation('$abc/100%')).toEqual({ operator: '/', v1: '$abc', v2: '100%' });
    });

    it('should return false for non-operation', () => {
        expect(operation.isOperation('$abc^100%')).toBe(false);
    });

    it('should exec *', () => {
        expect(operation.exec({ operator: '*', v1: 10, v2: 0.5 })).toBe(5);
    });

    it('should exec +', () => {
        expect(operation.exec({ operator: '+', v1: 10, v2: 0.5 })).toBe(10.5);
    });

    it('should exec -', () => {
        expect(operation.exec({ operator: '-', v1: 10, v2: 0.5 })).toBe(9.5);
    });

    it('should exec /', () => {
        expect(operation.exec({ operator: '/', v1: 10, v2: 0.5 })).toBe(20);
    });

    it('should throw on invalid data', () => {
        expect(() => operation.exec({ operator: 'a', v1: 10, v2: 0.5 })).toThrowError('Unknown operator: a');
        expect(() => operation.exec({ operator: '+', v1: '10', v2: 0.5 })).toThrowError(
            'Operation value should be number, you try: 10'
        );
        expect(() => operation.exec({ operator: '/', v1: 10, v2: 0 })).toThrowError(
            'Operation divisor should not be zero'
        );
        expect(() => operation.exec({ operator: '+', v1: 10, v2: null })).toThrowError(
            'Operation value should be number, you try: null'
        );
    });
});
