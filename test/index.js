/* global describe test expect */

import xre, { Xre } from '../src/index';

describe('Constructor', () => {
    test('Create RegExp with entire literal contents and default flags if no slashes passed', () => {
        expect(xre`test`.toString()).toBe('/test/Amsux');
    });

    test('Caching RegExp objects', () => {
        expect(xre`//`._regexp).toBe(xre`//`._regexp);
    });
});

describe('Native accessors', () => {
    test('Empty flags list', () => {
        expect(xre`//`.flags).toBe('');
    });

    test('Non-empty flags list', () => {
        expect(Array.from(new Set(xre`//gmi`.flags.split(''))).join('')).toBe('gim');
    });

    test('Duplicated flags removing', () => {
        expect(xre`//ii`.flags).toBe('i');
    });

    test('Empty source', () => {
        expect(xre`//g`.source).toBe('');
    });

    test('Non-empty source', () => {
        expect(xre`/test/i`.source).toBe('test');
    });

    test('Non-global RegExp flag', () => {
        expect(xre`//`.global).toBe(false);
    });

    test('Global RegExp flag', () => {
        expect(xre`//g`.global).toBe(true);
    });

    test('Case-sensitive flag', () => {
        expect(xre`//`.ignoreCase).toBe(false);
    });

    test('Case-insensitive flag', () => {
        expect(xre`//i`.ignoreCase).toBe(true);
    });

    test('Single-line flag', () => {
        expect(xre`//`.multiline).toBe(false);
    });

    test('Multi-line flag', () => {
        expect(xre`//m`.multiline).toBe(true);
    });

    test('Non-sticky flag', () => {
        expect(xre`//`.sticky).toBe(false);
    });

    test('Sticky flag', () => {
        expect(xre`//y`.sticky).toBe(true);
    });

    test('Non-unicode flag', () => {
        expect(xre`//`.unicode).toBe(false);
    });

    test('Unicode flag', () => {
        expect(xre`//u`.unicode).toBe(true);
    });

    test('Xre#lastIndex initial value', () => {
        expect(xre`//`.lastIndex).toBe(0);
    });

    test('Xre#lastIndex value after one run with global flag', () => {
        const re = xre`/(foo)?/g`;
        re.exec('foo');
        expect(re.lastIndex).toBe(3);
    });

    test('Xre#lastIndex setter', () => {
        const re = xre`/(foo)?/g`;
        re.lastIndex = 3;
        expect(re.lastIndex).toBe(3);
    });
});

describe('Native methods', () => {
    test('@@match with no matches', () => {
        expect(xre`/test/`[Symbol.match]('shit')).toBe(null);
    });

    test('More complex @@match', () => {
        expect(xre`/t(es)t/`[Symbol.match]('"test"')).toEqual('"test"'.match(/t(es)t/));
    });

    test('@@replace with string replacement', () => {
        expect(xre`/test/`[Symbol.replace]('shit test shit', 'shit')).toBe('shit test shit'.replace(/test/, 'shit'));
    });

    test('@@replace with function replacement', () => {
        expect(xre`/test/`[Symbol.replace]('shit test shit', () => 'shit')).toBe(
            'shit test shit'.replace(/test/, () => 'shit'),
        );
    });

    test('@@search basic test', () => {
        expect(xre`/test/`[Symbol.search]('shit test shit')).toBe('shit test shit'.search(/test/));
    });

    test('@@split basic test', () => {
        expect(xre`/test/`.split('shit test shit')).toEqual('shit test shit'.split(/test/));
    });
});

describe('Modified native methods', () => {
    test('@@species', () => {
        expect(xre`/test/`[Symbol.species]()).toBe(Xre);
    });

    test('exec() on RegExp with named group', () => {
        const result = /t(es)t/.exec('shit test shit');

        result.es = 'es';

        expect(xre`/t(?<es>es)t/`.exec('shit test shit')).toEqual(result);
    });

    test('test()', () => {
        expect(xre`/test/`.test('shit test shit')).toBe(true);
    });

    // TODO: Cover more use cases of `exec()` and `test()` (usage with `position` and `sticky` arguments).

    test('toString()', () => {
        expect(xre`/test/ig`.toString()).toBe('/test/gi');
    });
});

describe('XRegExp methods', () => {
    // TODO: Cover `XRegExp` methods.
});
