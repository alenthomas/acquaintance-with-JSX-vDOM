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