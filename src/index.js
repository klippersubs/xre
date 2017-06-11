import { join } from 'taghelper';
import DefaultXRegExp from 'xregexp/src/xregexp';

let _XRegExp = DefaultXRegExp;

/**
 * Native `RegExp#exec()` result type.
 */
interface IRegExpMatchResult {
    index: number,
    input: string,
    [index: number]: string,
}

/**
 * Replacement function for `String#replace()` method.
 */
interface IReplacementFunction {
    (...arguments: (string | number)[]): string,
}

/**
 * `XRegExp.exec()` result type.
 */
interface IXRegExpExecResult {
    index: number,
    input: string,
    [index: number]: string,
    [key: string]: string,
}

/**
 * Handler function type for `XRegExp.addToken()`.
 */
interface IAddTokenHandler {
    (match: IXRegExpExecResult[], scope: 'default' | 'class', flags: string): string,
}

/**
 * Options for `XRegExp.addToken()`.
 */
interface IAddTokenOptions {
    scope?: 'default' | 'class' | 'all',
    flag?: string,
    optionalFlags?: string,
    reparse?: boolean,
    leadChar?: string,
}

/**
 * Callback type for `XRegExp.forEach()`.
 */
interface IForEachCallback {
    (match: IXRegExpExecResult[], index: number, string: string, xre: RegExp): void,
}

const expression = /^\/([\s\S]*)\/(.*)$/;

export function configure({ XRegExp } = { XRegExp: DefaultXRegExp }) {
    _XRegExp = XRegExp;
}

export class Xre {
    _regexp: RegExp;

    constructor(input) {
        const parsed = expression.exec(input);

        if (parsed === null) {
            Object.defineProperty(this, '_regexp', {
                value: _XRegExp.cache(`${input}`, 'msux'),
            });
        } else {
            Object.defineProperty(this, '_regexp', {
                value: _XRegExp.cache(parsed[1], Array.from(new Set(parsed[2].split(''))).join('')),
            });
        }
    }

    // Native accessors.

    get flags(): string {
        return this._regexp.xregexp.flags;
    }

    get global(): boolean {
        return this._regexp.global;
    }

    get ignoreCase(): boolean {
        return this._regexp.ignoreCase;
    }

    get lastIndex(): number {
        return this._regexp.lastIndex;
    }

    set lastIndex(index: number) {
        this._regexp.lastIndex = index;
    }

    get multiline(): boolean {
        return this._regexp.multiline;
    }

    get source(): string {
        return this._regexp.xregexp.source;
    }

    get sticky(): boolean {
        return this._regexp.sticky;
    }

    get unicode(): boolean {
        return this._regexp.unicode;
    }

    // Native methods.

    [Symbol.match](string: string): IRegExpMatchResult | null {
        return this._regexp[Symbol.match](string);
    }

    [Symbol.replace](string: string, replacement: string | IReplacementFunction): string {
        return this._regexp[Symbol.replace](string, replacement);
    }

    [Symbol.search](string: string): number {
        return this._regexp[Symbol.search](string);
    }

    [Symbol.species](): typeof Xre {
        return Xre;
    }

    [Symbol.split](string: string, limit?: number): string[] {
        return this._regexp[Symbol.split](string, limit);
    }

    exec(string: string, position?: number, sticky?: boolean | string): IXRegExpExecResult | null {
        return _XRegExp.exec(string, this._regexp, position || this._regexp.lastIndex, sticky);
    }

    test(string: string, position?: number, sticky?: boolean | string): boolean {
        return _XRegExp.test(string, this._regexp, position || this._regexp.lastIndex, sticky);
    }

    toString() {
        // TODO: Cache source in `Xre` and return it here.
        return `/${this.source}/${this.flags}`;
    }

    // XRegExp accessors

    // XRegExp methods

    addToken(handler: IAddTokenHandler, options: IAddTokenOptions) {
        _XRegExp.addToken(this._regexp, handler, options);
    }

    forEach(string: string, callback: IForEachCallback) {
        _XRegExp.forEach(string, this._regexp, callback);
    }

    globalize(): Xre {
        return new Xre(`${this.toString()}g`);
    }

    match(string: string, scope?: 'one' | 'all'): string | string[] | null {
        return _XRegExp.match(string, this._regexp, scope);
    }

    replace(string: string, replacement: string | IReplacementFunction, scope?: 'one' | 'all'): string {
        return _XRegExp.replace(string, this._regexp, replacement, scope);
    }

    split(string: string, limit?: number): string[] {
        return _XRegExp.split(string, this._regexp, limit);
    }

    // Custom methods

    static xre(strings, ...values) {
        return new Xre(join(strings, values, { raw: true }));
    }
}

export default Xre.xre;
