import * as types from '../tiles';

it('should create type', () => {
  expect(types.SET).toEqual({
    request: 'TILES/SET/REQUEST',
    success: 'TILES/SET/SUCCESS',
    fail: 'TILES/SET/FAIL',
  });

  expect(types.RESET).toEqual({
    request: 'TILES/RESET/REQUEST',
    success: 'TILES/RESET/SUCCESS',
    fail: 'TILES/RESET/FAIL',
  });

  expect(types.CLICK).toEqual({
    request: 'TILES/CLICK/REQUEST',
    success: 'TILES/CLICK/SUCCESS',
    fail: 'TILES/CLICK/FAIL',
  });

  expect(types.RUN).toEqual({
    request: 'TILES/RUN/REQUEST',
    success: 'TILES/RUN/SUCCESS',
    fail: 'TILES/RUN/FAIL',
  });
});
