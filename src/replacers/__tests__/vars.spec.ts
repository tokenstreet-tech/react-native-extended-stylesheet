import { calc, extract, get, isVar } from '../vars';

describe('vars', () => {
    it('should detect var', () => {
        expect(isVar('$abc')).toBe(true);
        expect(isVar('abc')).toBe(false);
    });

    it('should calc var', () => {
        expect(calc('$abc', [{ $abc: 1 }])).toBe(1);
        expect(() => calc('$abc', [])).toThrow('Unresolved variable: $abc');
        expect(() => calc('abc', [{ $abc: 1 }])).toThrow('Unresolved variable: abc');
    });

    it('should take first var from varsArr', () => {
        expect(calc('$abc', [{ $abc: 1 }, { $abc: 2 }])).toBe(1);
    });

    it('should extract vars', () => {
        const obj = {
            $a: 1,
            $b: 2,
            c: 3,
            d: {
                $e: 1,
            },
        };
        expect(extract(obj)).toEqual({
            $a: 1,
            $b: 2,
        });
    });

    it('should get var', () => {
        expect(get('$abc', [{ $abc: 1 }, { $abc: 2 }])).toBe(1);
        expect(get('abc', [])).toBe(undefined);
        expect(() => get('abc', undefined as unknown as Array<never>)).toThrow(
            'You should pass vars array to vars.get()'
        );
    });

    it('should get object properties using path', () => {
        const obj = {
            $abc: {
                foo: 'foo',
                bar: {
                    color: '#FF',
                },
            },
        };

        expect(get('$abc.foo', [obj])).toBe('foo');
        expect(get('$abc.bar.color', [obj])).toBe('#FF');
        expect(get('$abc.bar.color2', [obj])).toBe(undefined);
        expect(get('$abc.bar1.color', [obj])).toBe(undefined);
    });

    it('should get object array values using path', () => {
        const obj = {
            $abc: {
                foo: [1, 2],
                bar: [
                    {
                        value: 'bar',
                    },
                ],
            },
        };

        expect(get('$abc.foo[0]', [obj])).toBe(1);
        expect(get('$abc.bar[0].value', [obj])).toBe('bar');
        expect(get('$abc.foo[20]', [obj])).toBe(undefined);
        expect(get('$abc.unk[10]', [obj])).toBe(undefined);
    });
});
