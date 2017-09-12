/** @jsx h */
function h(type, props, ...children) {
  return { type, props: props || {}, children };
}

function setBooleanProp(reTarget, name, value) {
   if(value) {
     reTarget.setAttribute(name, value);
     reTarget[name] = true;
   } else {
     reTarget[name] = false;
   }
}

function removeBooleanProp(reTarget, name) {
  reTarget.removeAttribute(name);
  reTarget[name] = false;
}

function isCustomProp(name) {
  return false;
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

function removeProp(reTarget, name, value) {
  if (isCustomProp(name)) {
    return;
  } else if (name === 'className') {
    reTarget.removeAttribute('class');
  } else if (typeof value === 'boolean') {
    removeBooleanProp(reTarget, name);
  } else {
    reTarget.removeAttribute(name);
  }
}

function setProps(reTarget, props) {
  Object.keys(props).forEach(name => {
    setProp(reTarget, name, props[name]);
  });
}

function updateProp(reTarget, name, newVal, oldVal) {
  if(!newVal) {
    removeProp(reTarget, name, oldVal);
  } else if (!oldVal || newVal !== oldVal) {
    setProp(reTarget, name, newVal);
   }
}

function updateProps(reTarget, newProps, oldProps = {}) {
  const props = Object.assign({}, newProps, oldProps);
  Object.keys(props).forEach(name => {
    updateProp(reTarget, name, newProps[name], oldProps[name]);
  });
}

function createElement(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }
  const parentElement = document.createElement(node.type);
  setProps(parentElement, node.props);
  node.children
    .map(createElement)
    .forEach(parentElement.appendChild.bind(parentElement));
  return parentElement;
}

function changed(node1, node2) {
  return typeof node1 !== typeof node2 ||
    typeof node1 === 'string' && node1 !== node2 ||
    node1.type !== node2.type;
}

function updateElement(rDom, newNode, oldNode, index=0) {
  if (!oldNode) {
    rDom.appendChild(createElement(newNode));
  } else if (!newNode) {
    rDom.removeChild(rDom.childNodes[index]);
  } else if (changed(newNode, oldNode)) {
    rDom.replaceChild(createElement(newNode), rDom.childNodes[index]);
  } else if (newNode.type) {
    updateProps(
      rDom.childNodes[index],
      newNode.props,
      oldNode.props
    );
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement(
        rDom.childNodes[index],
        newNode.children[index],
        oldNode.children[index],
        index
      );
    }
  }
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

const g = (
<ul style="list-style: none;">
  <li className="item item2">item 1</li>
  <li style="background: red;">
    <input type="checkbox" checked={false} />
    <input type="text" disabled={true} />
  </li>
</ul>
);

const root = document.getElementById('root');
const reload = document.getElementById('reload');

updateElement(root, f);
reload.addEventListener('click', () => {
  updateElement(root, g, f);
});
