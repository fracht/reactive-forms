# pxth

> Tiny utility library for object property path handling

[![npm version](https://img.shields.io/npm/v/pxth)](https://www.npmjs.com/package/pxth)
[![npm downloads](https://img.shields.io/npm/dw/pxth)](https://www.npmjs.com/package/pxth)
[![vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/pxth)](https://www.npmjs.com/package/pxth)

## Install

```bash
npm install pxth
```

Or

```bash
yarn add pxth
```

## Api reference

Here are all functions described.

### Pxth\<T>

Holds path to field of type `T` in the origin object. 
```ts
const a: Pxth<string>; // path to string field.

const b: Pxth<number>; // path to number field.
```

If `T` is object, it is possible to get paths to its fields:
```ts
const objectPath: Pxth<{ inner: string }>; // path to parent object.

const innerPath: Pxth<string> = objectPath.inner; // path to object's field.

const lengthPath: Pxth<number> = innerPath.length; // you can do it also for primitive type fields.

const deepLengthPath: Pxth<number> = objectPath.inner.length; // any amount of levels, just like normal object.
```

### deepGet

Deeply get value from object.

Usage:

```ts
import { deepGet } from 'pxth';

const somePath: Pxth<string> = /* from somewhere */;

// Function is type safe - type of value will be automatically inferred from Pxth. In this case - string.
const value = deepGet({ a: { b: { c: 'Hello world!' } } }, somePath);

console.log(value); // -> 'Hello world'

```

### deepSet

Deeply set value in object. Mutates the object and returns it. If value already exists, overwrites it.

Usage:

```ts
import { deepSet } from 'pxth';

const somePath: Pxth<string> = /* from somewhere */;

// Type safe - type of third parameter is inferred from Pxth.
deepSet({ a: { hello: 'asdf' } }, somePath, 'New value'); // -> { a: { hello: 'New value' } }
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

MIT © [Artiom Tretjakovas](https://github.com/ArtiomTr)

[Created with aqu 🌊](https://github.com/ArtiomTr/aqu#readme)
