import { takeEvery, put } from 'redux-saga/effects';
import store from 'redux/store';
import { SET, RESET, CLICK, RUN } from 'redux/types/tiles';
import { ROWS, COLS } from 'redux/reducers/tiles';
import Actions from 'redux/actions';

export function* set({ payload }) {
  yield put({ type: SET.success, payload });
}

export function* setSaga() {
  yield takeEvery(SET.request, set);
}

export function* reset() {
  yield put({ type: RESET.success });
}

export function* resetSaga() {
  yield takeEvery(RESET.request, reset);
}

export function* click({ x, y }) {
  // drop isWater and get a new reference to an Array
  const tiles = store.getState().tiles.map(
    row => row.map(
      col => ({ ...col, isError: false, isWater: false })
    ));

  if (!tiles[x][y].isSet) {
    // tile is not set

    if (y === 0 || tiles[x][y - 1].isSet) {
      // this is a bottom or the tile below is set
      tiles[x][y].isSet = true;
      tiles[x][y].isError = false;
    } else {
      tiles[x][y].isError = true;
    }
  } else {
    // tile is set

    if (y === ROWS - 1 || !tiles[x][y + 1].isSet) {
      // this is a bottom or the tile below is set
      tiles[x][y].isSet = false;
      tiles[x][y].isError = false;
    } else {
      tiles[x][y].isError = true;
    }
  }

  yield put(Actions.tiles.set(tiles));
}

export function* clickSaga() {
  yield takeEvery(CLICK.request, click);
}

export function* run() {
  const tiles = store.getState().tiles.slice(0);
  let shouldUpdate = false;

  for (let y = 0; y < ROWS; y++) {
    let left = -1;

    for (let x = 0; x < COLS; x++) {
      if (tiles[x][y].isSet) {
        if (left >= 0 && x > left + 1) {
          for (let k = left + 1; k < x; k++) {
            tiles[k][y].isWater = true;
            shouldUpdate = true;
          }
        }

        left = x;
      }
    }
  }

  if (shouldUpdate) {
    yield put(Actions.tiles.set(tiles));
  }
}

export function* runSaga() {
  yield takeEvery(RUN.request, run);
}

export default [
  setSaga,
  resetSaga,
  clickSaga,
  runSaga,
];
