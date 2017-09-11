- [Getting started with JSX](#org0b80f31)
  - [What does JSX do](#org369ff7f)
- [Getting started with Virtual DOM](#orgfad15c5)


<a id="org0b80f31"></a>

# Getting started with JSX

-   [What is JSX](https://jasonformat.com/wtf-is-jsx/)


<a id="org369ff7f"></a>

## What does JSX do

-   JSX is just a format that is used, the real work is done by the transpiler
-   the transpiler takes this form and calls a function with the args

```js
/** @jsx transform
*/
let vdom = <div id='foo'> Hello !</div>

// this will be executed as
let vdom = transform(
  'div',
  { id: 'foo' },
  ' Hello !'
)
```

-   we can define the function and its return values
-   here [babel](https://babeljs.io) transpiles the JSX and returns a JSON object with a node-name, its attributes and children

```js
/** @jsx transform
*/
function transform(nodeName, attributes, ...args) {
  let children = args.length? [].concat(args):{}
  return {nodeName, attributes, children}
}

let vdom = <div id='foo'> Hello !</div>

JSON.stringify(vdom, null, 2

"{
  "nodeName": "div",
  "attributes": {
    "id": "foo"
  },
  "children": [
    " Hello !"
  ]
}"

```


<a id="orgfad15c5"></a>

# Getting started with Virtual DOM

-   [virtual dom part 1](https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060)
-   [virtual dom part 2](https://medium.com/@deathmood/write-your-virtual-dom-2-props-events-a957608f5c76)
