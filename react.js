/** @jsx h */

const h = (type, props={}, children=[]) => ({
  type,
  props,
  children
});

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
