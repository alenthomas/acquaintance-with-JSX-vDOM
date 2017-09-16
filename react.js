/** @jsx h */

const h = (type, props={}, children=[]) => ({
  type,
  props,
  children
});

export const createVDOM = (element, id='.') => {
  const newElement = {
    ...element,
    id,
    children: element.children.map((child, index) => createVDOM(child, `${id}${index}.`))
  };

  if (typeof element.type === 'function') {
    const subtree = newElement.type(element.props);
    return createVDOM(subtree, id);
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
