---
# this is generated file.
title: useSubmitAction
layout: Docs
---

# useSubmitAction

> Hook

## Import

```js copy
import { useSubmitAction } from '@reactive-forms/core';
```

## Parameters

| Name    | Type                                                                                                                                                  | Default  | Description                                                                                                          |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| apply\* | { &lt;T, R&gt;(this: (this: T) =&gt; R, thisArg: T): R; &lt;T, A extends any[], R&gt;(this: (this: T, ...args: A) =&gt; R, thisArg: T, args: A): R; } | Required | Calls the function with the specified object as the this value and the elements of specified array as the arguments. |

@param thisArg The object to be used as the this object.
@param args An array of argument values to be passed to the function.
| call* | &lt;T, A extends any[], R&gt;(this: (this: T, ...args: A) =&gt; R, thisArg: T, ...args: A) =&gt; R | Required | Calls the function with the specified object as the this value and the specified rest arguments as the arguments.
@param thisArg The object to be used as the this object.
@param args Argument values to be passed to the function.
| bind* | { &lt;T&gt;(this: T, thisArg: ThisParameterType&lt;T&gt;): OmitThisParameter&lt;T&gt;; &lt;T, A0, A extends any[], R&gt;(this: (this: T, arg0: A0, ...args: A) =&gt; R, thisArg: T, arg0: A0): (...args: A) =&gt; R; &lt;T, A0, A1, A extends any[], R&gt;(this: (this: T, arg0: A0, arg1: A1, ...args: A) =&gt; R, thisArg: T, arg0: A0, arg1: A1): (...args: A) =&gt;... | Required | For a given function, creates a bound function that has the same body as the original function.
The this object of the bound function is associated with the specified object, and has the specified initial parameters.
@param thisArg The object to be used as the this object.
@param args Arguments to bind to the parameters of the function.
| toString | () =&gt; string | [object Object] | Returns a string representation of a function.
| prototype* | any | Required |
| length* | number | Required |
| arguments* | any | Required |
| caller* | Function | Required |
| name* | string | Required | Returns the name of the function. Function names are read-only and can not be changed.
| \_\_@hasInstance* | (value: any) =&gt; boolean | Required | Determines whether the given value inherits from this function if this function was used
as a constructor function.

A constructor function can control which objects are recognized as its instances by
&#39;instanceof&#39; by overriding this method.
