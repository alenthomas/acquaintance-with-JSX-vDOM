/** @jsx h */
function h(type, props, ...children) {
   return { type, props: props || {}, children };
}

function setProp(reTarget, name, value) {
   if (isCustomProp(name)) {
      return;
   } else if (name === 'className') {
      reTarget.setAttribute('class', value);
   } else if (typeof value === 'boolean') {
      setBooleanProp(reTarget, name, value);
   } else {
      reTarget.setAttribute(name, value);
   }
}

function setProps(reTarget, props) {
   Object.keys(props).forEach(name => {
      setProp(reTarget, name, props[name]);
   });
}

function createElement(node) {
   if (typeof node === 'string') {
      return document.createTextNode(node);
   }
     const parentElement = document.createElement(node.type);
   setProps(parentElement, node.props);
   node.children.map(createElement)
.forEach(parentElement.appendChild.bind(parentElement));

     return parentElement;
}

function setBooleanProp(reTarget, name, value) {
   if(value) {
      reTarget.setAttribute(name, value);
      reTarget[name] = true;
   } else {
      reTarget[name] = false;
   }
}

function isCustomProp(name) {
   return false;
}

const f = (
<ul style="list-style: none;">
  <li className="item">item 1</li>
  <li className="item">
    <input type="checkbox" checked={true} />
    <input type="text" disabled={true} />
  </li>
</ul>
);

const root = document.getElementById('root');
root.appendChild(createElement(f));
