import * as helpers from '../helpers';

it('should create type', () => {
  expect(helpers.createType('TEST1')).toEqual({
    request: 'TEST1/REQUEST',
    success: 'TEST1/SUCCESS',
    fail: 'TEST1/FAIL',
  });

  expect(helpers.createType('TEST2')).toEqual({
    request: 'TEST2/REQUEST',
    success: 'TEST2/SUCCESS',
    fail: 'TEST2/FAIL',
  });
});
