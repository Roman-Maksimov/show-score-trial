import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Main from 'components/main';
import store from 'redux/store';

test('should render Main component', () => {
  const component = renderer.create(
    <Provider store={store}>
      <Main />
    </Provider>,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});