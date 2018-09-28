import reducer, { initialState } from '../tiles';
import * as types from '../../types/tiles';

it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it('should handle SET', () => {
  const payload = initialState.slice(0);
  payload[0][0].isSet = true;
  payload[0][1].isWater = true;
  payload[0][2].isSet = true;

  expect(
    reducer(initialState, {
      type: types.SET.success,
      payload,
    })
  ).toEqual(payload);
});

it('should handle RESET', () => {
  expect(
    reducer([], {
      type: types.RESET.success,
    })
  ).toEqual(initialState);
});
