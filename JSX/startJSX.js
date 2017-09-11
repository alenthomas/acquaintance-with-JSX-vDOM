/** @jsx h */
// tells babel to transpile all h functions

function h(nodeName, attributes, ...args) {
  let children = args.length ? [].concat(...args) : null
  return { nodeName, attributes, children }
}

function render(vnode) {
  if (typeof vnode === 'string')
    return document.createTextNode(vnode)

  let n = document.createElement(vnode.nodeName)

  let a = vnode.attributes || {}
  Object.keys(a).forEach(k => n.setAttribute(k, a[k]));

  (vnode.children || []).forEach(c => n.appendChild(render(c)))
  return n
}

let vdom = <div id='foo'>Hello !</div>
/**
 * {
 *   nodeName: 'div',
 *   attributes: {
 *     'id':'foo'
 *   },
 *   children: ['Hello!']
 * }
 */

let dom = render(vdom)

/**
 * <div id="foo">Hello !</div>
 */

document.body.appendChild(dom)