import React from 'react';
import App from '../app';
import renderer from 'react-test-renderer';

test('should render App', () => {
  const component = renderer.create(
    <App />,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});