/** @jsx h */

const h = (type, props={}, children=[]) => ({
  type,
  props,
  children
});

const WelcomeComponent = ({ name }) => h('div', {}, [`Welcome ${name}`]);
