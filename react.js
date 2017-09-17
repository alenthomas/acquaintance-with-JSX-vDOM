/** @jsx h */

const h = (type, props={}, children=[]) => ({
  type,
  props,
  children
});

const shallowEqual = function (left, right) {
  if (!left || !right) {
    return false;
  }
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);

  return leftKeys.length === rightKeys.length &&
    leftKeys.every(leftKey => left[leftKey] === right[leftKey]);
};

const memoize = component => {
  let lastProps = null;
  let lastResult = null;

  return props => {
    if (!shallowEqual(props, lastProps)) {
      lastResult = component(props);
      lastProps = props;

      lastResult.memoized = true;
    } else {
      lastResult.memoized = false;
    }
    return lastResult;
  };
};

const diff = (left, right, patches, parent=null) => {
  if (!left) {
    patches.push({
      parent,
      type: PatchTypes.PATCH_CREATE_NODE,
      node: right
    });
  } else if (!right) {
    patches.push({
      type: PatchTypes.PATCH_REMOVE_NODE,
      node: left
    });
  } else if (left.type !== right.type) {
    patches.push({
      type: PatchTypes.PATCH_REPLACE_NODE,
      replacingNode: left,
      node: right
    });
  } else if (right.memoized) {
    return;
  } else {
    const children = left.children.length >= right.children.length ?
      left.children : right.children;

    children.forEach((child, index) => diff(
      left.children[index],
      right.children[index],
      patches,
      left
    ));
  }
};

const ID_KEY = 'data-react-id';

const correlateVDOMNODE = (vdomNode, domRoot) => {
  if (vdomNode === null) {
    return domRoot;
  } else {
    return document.querySelector(`[${ID_KEY}="${vdomNode.id}"]`);
  }
};

const createNodeRecursive = (vdomNode, domNode) => {
  const domElement = document.createElement(vdomNode.type);
  domElement.setAttribute(ID_KEY, vdomNode.id);
  domNode.appendChild(domElement);
  vdomNode.children.forEach((child) =>
    createNodeRecursive(child, domElement));
};

const applyPatch = (patch, domRoot) => {
  switch(patch.type) {
    case PatchTypes.PATCH_CREATE_NODE: {
      const domNode = correlateVDOMNode(patch.parent, domRoot);
      createNodeRecursive(patch.node, domNode);
    }
    break;

    case PatchTypes.PATCH_REMOVE_NODE: {
      const domNode = correlateVDOMNode(patch.node, domRoot);
      domNode.parentNode.removeChild(domNode);
    }
    break;

    case PatchTypes.PATCH_REPLACE_NODE: {
      const domNode = correlateVDOMNode(patch.replacingNode, domRoot);
      const parentDomNode = domNode.parentNode;
      parentDomNode.removeChild(domNode);
      createNodeRecursive(patch.node, parentDomNode);
    }
    break;

    default:
      throw new Error(`Missing implementation for patch ${patch.type}`);
  }
};

export const createRender = domElement => {
  let lastVDOM = null;
  let patches = null;

  return element => {
    const vdom = createVDOM(element);

    patches = [];
    diff(lastVDOM, vdom, patches);

    patches.forEach(patch => applyPatch(patch, domElement));

    lastVDOM = vdom;
  };
};

export const createVDOM = (element, id='.') => {
  const newElement = {
    ...element,
    id,
    children: element.children.map((child, index) => createVDOM(child, `${id}${index}.`))
  };

  if (typeof element.type === 'function') {
    const subtree = newElement.type(element.props);
    if (subtree.memoized) {
      return subtree;
    } else {
    return createVDOM(subtree, id);
    }
  } else {
    return newElement;
  }
};

const WelcomeComponent = ({ name }) => h('div', {}, [`Welcome ${name}`]);

const RootComponent = ({ user }) => {
  if (user) {
    return h(WelcomeComponent, { name: user.name });
  } else {
    return h('div', {}, ['Please Login']);
  }
};
