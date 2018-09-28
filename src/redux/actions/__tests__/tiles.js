import _ from 'lodash';
import * as actions from '../tiles';
import * as types from '../../types/tiles';

it('should create an action to set tiles', () => {
  const payload = _.times(12, () => _.times(6, () => ({
    isSet: false,
    isWater: false,
  })));

  const expectedAction = {
    type: types.SET.request,
    payload,
  };

  expect(actions.set(payload)).toEqual(expectedAction);
});

it('should create an action to reset tiles', () => {
  const expectedAction = {
    type: types.RESET.request,
  };

  expect(actions.reset()).toEqual(expectedAction);
});

it('should create an action for onClick', () => {
  const x = 0;
  const y = 0;

  const expectedAction = {
    type: types.CLICK.request,
    x, y,
  };

  expect(actions.click(x, y)).toEqual(expectedAction);
});

it('should create an action for onRun', () => {
  const expectedAction = {
    type: types.RUN.request,
  };

  expect(actions.run()).toEqual(expectedAction);
});
