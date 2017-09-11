- [Getting started with JSX](#org59234f3)
  - [What does JSX do](#org670926c)
- [Getting started with Virtual DOM](#org0b65bac)


<a id="org59234f3"></a>

# Getting started with JSX

-   [What is JSX](https://jasonformat.com/wtf-is-jsx/)


<a id="org670926c"></a>

## What does JSX do

-   converts a string to a JSON object with a node-name, its attributes and childrens

```js
let vdom = <div id='foo'> Hello !</div>

console.log(JSON.stringify(vdom, null, 2)

/**
 * {
 *   nodeName: 'div',
 *   attributes: {
 *     'id':'foo'
 *   },
 *   children: ['Hello!']
 * }
 */

```


<a id="org0b65bac"></a>

# Getting started with Virtual DOM

-   [virtual dom part 1](https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060)
-   [virtual dom part 2](https://medium.com/@deathmood/write-your-virtual-dom-2-props-events-a957608f5c76)
