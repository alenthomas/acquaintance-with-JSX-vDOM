- [Getting started with JSX](#orgeb0d807)
  - [What does JSX do](#orgf29090e)
- [Getting started with Virtual DOM](#org0172a47)


<a id="orgeb0d807"></a>

# Getting started with JSX

-   [What is JSX](https://jasonformat.com/wtf-is-jsx/)


<a id="orgf29090e"></a>

## What does JSX do

-   JSX is just a format that is used, the real work is done by the transpiler
-   the transpiler converts this form to a JSON object
-   here [babel](https://babeljs.io) transpiles the JSX to a JSON object with a node-name, its attributes and children

```js
let vdom = <div id='foo'> Hello !</div>

console.log(JSON.stringify(vdom, null, 2)

/**
 *"{
 * "nodeName": "div",
 * "attributes": {
 *   "id": "foo"
 * },
 * "children": [
 *   "Hello !"
 * ]
 * }"
 */
```


<a id="org0172a47"></a>

# Getting started with Virtual DOM

-   [virtual dom part 1](https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060)
-   [virtual dom part 2](https://medium.com/@deathmood/write-your-virtual-dom-2-props-events-a957608f5c76)
