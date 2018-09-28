import _ from 'lodash';
import { SET, RESET } from 'redux/types/tiles';

export const ROWS = 6;
export const COLS = 12;

export const getInitialState = () => _.times(COLS, () => _.times(ROWS, () => ({
  isSet: false,
  isWater: false,
  isError: false,
})));

export const initialState = getInitialState();

export default (state = initialState, action) => {
  switch (action.type) {
    case SET.success:
      return action.payload.slice(0);
    case RESET.success:
      return initialState.slice(0);
    default:
      return state;
  }
};
