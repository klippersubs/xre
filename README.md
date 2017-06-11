# xre

 >  [XRegExp][xregexp] regular expressions without the pain in the ass.

````bash
$ yarn add xre
````

````javascript
import xre from 'xre';

/*
 * Named groups and Unicode support
 */

const fullName = xre`/(?<firstName>\p{Letter}+)\s(?<lastName>\p{Letter}+)/i`;

console.log(fullName.exec('Shit Ass').firstName);
// → Shit

console.log(fullName.exec('Говно Жопа').firstName);
// → Говно

console.log(fullName.exec('くそ けつ').firstName);
// → くそ

/*
 * Multi-line RegExp with comments
 */

const date = xre`/
    (?<year>  \d{4}) - # Year
    (?<month> \d{2}) - # Month
    (?<day>   \d{2})   # Day
/x`;

const { year, month, day } = date.exec('2017-06-11');

console.log(`Year: ${year}, month: ${month}, day: ${day}`);
// → Year: 2017, month: 06, day: 11
````

## API

All built-in `RegExp`'s [methods and properties][regexp] is fully supported,
so you can use `xre` regular expressions as an argument
for `String`'s methods such as `replace` or `match`.

### Methods with non-standard behavior

#### `exec`

Arguments:

 *  `string: string` — string to search.
 *  `position: number = lastIndex` — zero-based index at which to start the search.
 *  `sticky: boolean | string = false` — whether the match must start at the specified position only.
    The string `'sticky'` is accepted as an alternative to `true`.

Returns:

 *  Match array with named backreference properties, or `null`.

See also:

 *  [XRegExp docs for `exec()` method][exec].

#### `test`

Arguments:

 *  See [`Xre#exec`](#exec) method arguments.

See also:

 *  [XRegExp docs for `test()` method][test].

### Non-standard methods

Non-standard methods are derived from XRegExp's ones, but does not take regexp argument.

 *  `addToken` (see [XREgExp docs for `addToken()` method][addToken]).
 *  `forEach` (see [XREgExp docs for `forEach()` method][forEach]).
 *  `globalize` (see [XREgExp docs for `globalize()` method][globalize]).
 *  `match` (see [XREgExp docs for `match()` method][match]).
 *  `replace` (see [XREgExp docs for `replace()` method][replace]).
 *  `split` (see [XREgExp docs for `split()` method][split]).

## Contributing

````bash
$ yarn run lint
$ yarn run test
````

[regexp]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
[xregexp]: http://xregexp.com/
[exec]: http://xregexp.com/api/#exec
[test]: http://xregexp.com/api/#test
[addToken]: http://xregexp.com/api/#addToken
[forEach]: http://xregexp.com/api/#forEach
[globalize]: http://xregexp.com/api/#globalize
[match]: http://xregexp.com/api/#match
[replace]: http://xregexp.com/api/#replace
[split]: http://xregexp.com/api/#split
