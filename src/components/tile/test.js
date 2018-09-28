import React from 'react';
import _ from 'lodash';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Tile from './';


const defaultProps = {
  onClick: _.noop,
};

test('should render empty tile', () => {
  const component = renderer.create(
    <Tile {...defaultProps} />,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('should render black tile', () => {
  const component = renderer.create(
    <Tile {...defaultProps} isSet />,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('should render blue tile', () => {
  const component = renderer.create(
    <Tile {...defaultProps} isWater />,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('should write isError to state', () => {
  const component = shallow(
    <Tile {...defaultProps} />,
  );

  component.setProps({ isError: true }, () => {
    expect(component.state().isError).toEqual(true);
  })
});
