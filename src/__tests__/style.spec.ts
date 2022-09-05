import { Style } from '../style';

describe('style', () => {
    let mathRandomSpy: jest.SpyInstance;
    beforeEach(() => {
        mathRandomSpy = jest.spyOn(global.Math, 'random').mockReturnValue(0);
    });
    afterEach(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    });

    it('should calc style', () => {
        const source = {
                $a: 1,
                $b: '$d',
                fontSize: '$a',
                borderWidth: '$b',
                color: '$e',
            },
            varsArr = [{ $a: 3, $d: 3, $e: 'abc' }],
            res = new Style(source, varsArr).calc();

        expect(res).toEqual({
            calculatedVars: {
                $a: 1,
                $b: 3,
            },
            calculatedProps: {
                fontSize: 1,
                borderWidth: 3,
                color: 'abc',
            },
        });
    });

    it('should calc array props (#130) instead of passthrough (#103)', () => {
        const source = {
                $a: 5,
                transform: [{ rotate: '45deg' }, { translateX: '$a' }, { translateY: '10 + $a' }],
            },
            res = new Style(source, []).calc();

        expect(res).toEqual({
            calculatedVars: {
                $a: 5,
            },
            calculatedProps: {
                transform: [{ rotate: '45deg' }, { translateX: 5 }, { translateY: 15 }],
            },
        });
    });

    it('should throw error on cyclic refs', () => {
        const source = {
            $a: '$b',
            $b: '$a',
        };
        expect(() => new Style(source).calc()).toThrow('Cyclic reference: $b -> $a -> $b');
    });

    it('should apply scale inlined', () => {
        const source = {
                $scale: 2,
                $b: '$d',
                fontSize: '$a',
                borderWidth: '$b',
                prop: 1,
                width: 2,
            },
            varsArr = [{ $a: 2, $d: 3 }],
            res = new Style(source, varsArr).calc();

        expect(res).toEqual({
            calculatedVars: {
                $scale: 2,
                $b: 3,
            },
            calculatedProps: {
                fontSize: 4,
                borderWidth: 6,
                prop: 1,
                width: 4,
            },
        });
    });

    it('should apply scale from vars', () => {
        const source = {
                $b: '$d',
                $width: 1,
                fontSize: '$a',
                borderWidth: '$b',
                prop: '$width',
                width: '$width',
            },
            varsArr = [{ $a: 2, $d: 3 }, { $scale: 2 }],
            res = new Style(source, varsArr).calc();

        expect(res).toEqual({
            calculatedVars: {
                $width: 1,
                $b: 3,
            },
            calculatedProps: {
                fontSize: 4,
                borderWidth: 6,
                prop: 1,
                width: 2,
            },
        });
    });

    it('should outline', () => {
        const source = {
                prop: 10,
            },
            varsArr = [{ $outline: true }, {}];

        const res = new Style(source, varsArr).calc();

        expect(res).toEqual({
            calculatedVars: null,
            calculatedProps: {
                prop: 10,
                borderWidth: 1,
                borderColor: 'black',
            },
        });
        expect(mathRandomSpy.mock.calls.length).toBe(1);
    });

    it('should support media queries', () => {
        const source = {
                $b: 2,
                c: 1,
                '@media ios': {
                    $b: 3,
                    c: '$b',
                },
            },
            result = new Style(source).calc();
        expect(result).toEqual({
            calculatedVars: {
                $b: 3,
            },
            calculatedProps: {
                c: 3,
            },
        });
    });

    describe('nested props (#99)', () => {
        it('should calc nested style props (#99)', () => {
            const source = {
                    shadowOffset: {
                        width: '$width',
                        foo: 'bar',
                    },
                },
                varsArr = [{ $width: 100, $height: 200 }],
                styles = new Style(source, varsArr).calc();

            expect(styles).toEqual({
                calculatedVars: null,
                calculatedProps: {
                    shadowOffset: {
                        width: 100,
                        foo: 'bar',
                    },
                },
            });
        });

        it('should support media queries', () => {
            const source = {
                    shadowOffset: {
                        width: '$width',
                        foo: 'bar',
                    },
                    '@media ios': {
                        shadowOffset: {
                            width: 1,
                            height: '$height',
                        },
                    },
                },
                varsArr = [{ $width: 100, $height: 200 }],
                styles = new Style(source, varsArr).calc();

            expect(styles).toEqual({
                calculatedVars: null,
                calculatedProps: {
                    shadowOffset: {
                        width: 1,
                        foo: 'bar',
                        height: 200,
                    },
                },
            });
        });
    });
});
