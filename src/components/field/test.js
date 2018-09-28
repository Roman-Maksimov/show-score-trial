import React from 'react';
import _ from 'lodash';
import { Field } from './';
import renderer from 'react-test-renderer';

const defaultProps = {
  tiles: _.times(12, () => _.times(6, () => ({
    isSet: false,
    isWater: false,
  }))),
  onReset: _.noop,
  onClick: _.noop,
  onRun: _.noop,
};

test('should render 1x1 empty field', () => {
  const tiles = _.times(1, () => _.times(1, () => ({
    isSet: false,
    isWater: false,
  })));

  const component = renderer.create(
    <Field {...defaultProps} tiles={tiles} />,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('should render 4x4 empty field', () => {
  const tiles = _.times(4, () => _.times(4, () => ({
    isSet: false,
    isWater: false,
  })));

  const component = renderer.create(
    <Field {...defaultProps} tiles={tiles} />,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('should render 12x6 empty field', () => {
  const component = renderer.create(
    <Field {...defaultProps} />,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('should render field with marked tiles', () => {
  const tiles = defaultProps.tiles.slice(0);

  tiles[0][0].isSet = true;
  tiles[0][1].isWater = true;
  tiles[0][2].isSet = true;

  const component = renderer.create(
    <Field {...defaultProps} tiles={tiles} />,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
