import { SET, RESET, CLICK, RUN } from 'redux/types/tiles';

export const set = payload => ({
  type: SET.request,
  payload
});

export const reset = () => ({
  type: RESET.request,
});

export const click = (x, y) => ({
  type: CLICK.request,
  x, y,
});

export const run = () => ({ type: RUN.request });
