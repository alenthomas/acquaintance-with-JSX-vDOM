/** @jsx h */

const h = (type, props={}, children=[]) => ({
  type,
  props,
  children
});

const WelcomeComponent = ({ name }) => h('div', {}, [`Welcome ${name}`]);

const RootComponent = ({ user }) => {
  if (user) {
    return h(WelcomeComponent, { name: user.name });
  } else {
    return h('div', {}, ['Please Login']);
  }
};
