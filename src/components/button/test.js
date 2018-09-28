import React from 'react';
import Button from './';
import renderer from 'react-test-renderer';

test('should render common button', () => {
  const component = renderer.create(
    <Button>OK</Button>,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('should render accent button', () => {
  const component = renderer.create(
    <Button accent>OK</Button>,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('should render custom button', () => {
  const component = renderer.create(
    <Button className="customButton">OK</Button>,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('should render custom accent button', () => {
  const component = renderer.create(
    <Button className="customButton" accent>OK</Button>,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
