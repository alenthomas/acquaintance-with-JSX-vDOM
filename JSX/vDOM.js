/** @jsx h */
function h(type, props, ...children) {
  return {type, props, children}
}

//html
//<ul class='list'>
//  <li>item 1</li>
//  <li>item 2</li>
//</ul>

// html to javascript objects
// { type: 'ul', props: { 'class': 'list'}, children: [
//   { type: 'li', props: {}, children: ['item 1'] },
//   { type: 'li', props: {}, children: ['item 2'] }
// ]}

function createElement(vNode) {
  if(typeof vNode === 'string') {
    return document.createTextNode(vNode)
  }
  const parentElement = document.createElement(vNode.type)
  vNode.children
      .map(createElement)
      .forEach(parentElement.appendChild.bind(parentElement))
  return parentElement
}

function updateElement(rDom, newNode, oldNode, index = 0) {
  if (!oldNode) {
    rDom.appendChild(createElement(newNode))
  } else if (!newNode) {
    rDom.removeChild(rDom.childNodes[index])
  }
}

function changed(node1, node2) {
  return typeof node1 !== typeof node2 ||
    typeof node1 === 'string' && node1 !== node2 ||
    node1.type !== node2.type
}

const list = (
  <ul className='list'>
    <li>item 1</li>
    <li>item 2</li>
  </ul>
)

const root = document.getElementById('root')
root.appendChild(createElement(list))

console.log(list)
console.log(JSON.stringify(list, null, 2))