import runSaga from 'redux-saga-jest'
import store from 'redux/store';
import * as sagas from '../tiles';
import * as types from '../../types/tiles';
import { getInitialState } from '../../reducers/tiles';

const set = action => new Promise(resolve => {
  const state = store.getState().tiles;

  store.subscribe(() => {
    if (state !== store.getState().tiles) {
      resolve();
    }
  });

  store.dispatch(action);
});

const reset = () => set({ type: types.RESET.success });

describe('tiles.set', () => {
  beforeAll(reset);

  const payload = [];
  const { it, expect } = runSaga(sagas.set({ payload }));

  it('should put SET.success action', ({ value }) => {
    expect(value).put({ type: types.SET.success, payload });
  });
});

describe('tiles.reset', () => {
  beforeAll(reset);

  const { it, expect } = runSaga(sagas.reset());

  it('should put RESET.success action', ({ value }) => {
    expect(value).put({ type: types.RESET.success });
  });
});

describe('tiles.click', () => {
  describe('should set tile on first row', () => {
    beforeAll(reset);

    const payload = getInitialState();

    payload[0][0].isSet = true;

    const { it, expect } = runSaga(sagas.click({ x: 0, y: 0 }));

    it('should set the tile', ({ value }) => {
      expect(value).put({ type: types.SET.request, payload });
    });
  });

  describe('shouldn\'t set tile above first row', () => {
    beforeAll(reset);

    const payload = getInitialState();

    payload[0][1].isError = true;

    const { it, expect } = runSaga(sagas.click({ x: 0, y: 1 }));

    it('should set error for the tile', ({ value }) => {
      expect(value).put({ type: types.SET.request, payload });
    });
  });

  describe('should set tile on top of another tile', () => {
    beforeAll(() => {
      const payload = getInitialState();
      payload[0][0].isSet = true;

      return set({ type: types.SET.success, payload });
    });

    const payload = getInitialState();

    payload[0][0].isSet = true;
    payload[0][1].isSet = true;

    const { it, expect } = runSaga(sagas.click({ x: 0, y: 1 }));

    it('should set second tile', ({ value }) => {
      expect(value).put({ type: types.SET.request, payload });
    });
  });

  describe('shouldn\'t set tile above the top of another tile', () => {
    beforeAll(() => {
      const payload = getInitialState();
      payload[0][0].isSet = true;

      return set({ type: types.SET.success, payload });
    });

    const payload = getInitialState();

    payload[0][0].isSet = true;
    payload[0][2].isError = true;

    const { it, expect } = runSaga(sagas.click({ x: 0, y: 2 }));

    it('should set error for the tile', ({ value }) => {
      expect(value).put({ type: types.SET.request, payload });
    });
  });

  describe('should cancel marked tile', () => {
    beforeAll(() => {
      const payload = getInitialState();
      payload[0][0].isSet = true;

      return set({ type: types.SET.success, payload });
    });

    const payload = getInitialState();
    const { it, expect } = runSaga(sagas.click({ x: 0, y: 0 }));

    it('should cancel isSet from the tile', ({ value }) => {
      expect(value).put({ type: types.SET.request, payload });
    });
  });

  describe('shouldn\'t cancel marked tile if there is a tile above', () => {
    beforeAll(() => {
      const payload = getInitialState();
      payload[0][0].isSet = true;
      payload[0][1].isSet = true;

      return set({ type: types.SET.success, payload });
    });

    const payload = getInitialState();

    payload[0][0].isSet = true;
    payload[0][0].isError = true;
    payload[0][1].isSet = true;

    const { it, expect } = runSaga(sagas.click({ x: 0, y: 0 }));

    it('should set error for the first tile', ({ value }) => {
      expect(value).put({ type: types.SET.request, payload });
    });
  });
});

describe('tiles.run', () => {
  describe('shouldn\'t run without state changes', () => {
    beforeAll(reset);

    const { it, expect } = runSaga(sagas.run());

    it('shouldn\'t put action', ({ value }) => {
      expect(value).toBe(undefined);
    });
  });

  describe('shouldn\'t run if there are no water tiles', () => {
    describe('[0, 0] => set', () => {
      beforeAll(() => {
        const payload = getInitialState();
        payload[0][0].isSet = true;

        return set({type: types.SET.success, payload});
      });

      const { it, expect } = runSaga(sagas.run());

      it('shouldn\'t put action', ({ value }) => {
        expect(value).toBe(undefined);
      });
    });

    describe('[1, 0] => set', () => {
      beforeAll(() => {
        const payload = getInitialState();
        payload[1][0].isSet = true;

        return set({ type: types.SET.success, payload });
      });

      const { it, expect } = runSaga(sagas.run());

      it('shouldn\'t put action', ({ value }) => {
        expect(value).toBe(undefined);
      });
    });

    describe('[1, 0] => set; [2, 0] => set', () => {
      beforeAll(() => {
        const payload = getInitialState();
        payload[1][0].isSet = true;
        payload[2][0].isSet = true;

        return set({ type: types.SET.success, payload });
      });

      const { it, expect } = runSaga(sagas.run());

      it('shouldn\'t put action', ({ value }) => {
        expect(value).toBe(undefined);
      });
    });

    describe('[1, 0] => set; [2, 0] => set; [2, 1] => set', () => {
      beforeAll(() => {
        const payload = getInitialState();
        payload[1][0].isSet = true;
        payload[2][0].isSet = true;
        payload[2][1].isSet = true;

        return set({ type: types.SET.success, payload });
      });

      const { it, expect } = runSaga(sagas.run());

      it('shouldn\'t put action', ({ value }) => {
        expect(value).toBe(undefined);
      });
    });
  });

  describe('should run if there are water tiles', () => {
    describe('[0, 0] => set; [1, 0] => water; [2, 0] => set', () => {
      beforeAll(() => {
        const payload = getInitialState();
        payload[0][0].isSet = true;
        payload[2][0].isSet = true;

        return set({ type: types.SET.success, payload });
      });

      const payload = getInitialState();

      payload[0][0].isSet = true;
      payload[1][0].isWater = true;
      payload[2][0].isSet = true;

      const { it, expect } = runSaga(sagas.run());

      it('shouldn\'t put action', ({ value }) => {
        expect(value).put({ type: types.SET.request, payload });
      });
    });
  });

  describe('should run if there are water tiles', () => {
    describe('[0, 0] => set; [1, 0] => water; [2, 0] => set; [0, 1] => set', () => {
      beforeAll(() => {
        const payload = getInitialState();
        payload[0][0].isSet = true;
        payload[0][1].isSet = true;
        payload[2][0].isSet = true;

        return set({ type: types.SET.success, payload });
      });

      const payload = getInitialState();

      payload[0][0].isSet = true;
      payload[0][1].isSet = true;
      payload[1][0].isWater = true;
      payload[2][0].isSet = true;

      const { it, expect } = runSaga(sagas.run());

      it('shouldn\'t put action', ({ value }) => {
        expect(value).put({ type: types.SET.request, payload });
      });
    });
  });

  describe('should run if there are water tiles', () => {
    describe('[1, 0] => set; [2, 0] => water; [3, 0] => set', () => {
      beforeAll(() => {
        const payload = getInitialState();
        payload[1][0].isSet = true;
        payload[3][0].isSet = true;

        return set({ type: types.SET.success, payload });
      });

      const payload = getInitialState();

      payload[1][0].isSet = true;
      payload[2][0].isWater = true;
      payload[3][0].isSet = true;

      const { it, expect } = runSaga(sagas.run());

      it('shouldn\'t put action', ({value}) => {
        expect(value).put({ type: types.SET.request, payload });
      });
    });
  });

  describe('should run if there are water tiles', () => {
    describe('[1, 0] => set; [2, 0] => water; [3, 0] => water; [4, 0] => set', () => {
      beforeAll(() => {
        const payload = getInitialState();
        payload[1][0].isSet = true;
        payload[4][0].isSet = true;

        return set({ type: types.SET.success, payload });
      });

      const payload = getInitialState();

      payload[1][0].isSet = true;
      payload[2][0].isWater = true;
      payload[3][0].isWater = true;
      payload[4][0].isSet = true;

      const { it, expect } = runSaga(sagas.run());

      it('shouldn\'t put action', ({ value }) => {
        expect(value).put({ type: types.SET.request, payload });
      });
    });
  });

  describe('should run if there are water tiles', () => {
    describe('[1, 0] => set; [2, 0] => water; [3, 0] => water; [4, 0] => set; [5, 0] => set; [6, 0] => set; [7, 0] => set; [4, 1] => set; [5, 1] => water; [6, 1] => water; [7, 1] => set; [7, 2] => set', () => {
      beforeAll(() => {
        const payload = getInitialState();
        payload[1][0].isSet = true;
        payload[4][0].isSet = true;
        payload[5][0].isSet = true;
        payload[6][0].isSet = true;
        payload[7][0].isSet = true;
        payload[4][1].isSet = true;
        payload[7][1].isSet = true;
        payload[7][2].isSet = true;

        return set({ type: types.SET.success, payload });
      });

      const payload = getInitialState();

      payload[1][0].isSet = true;
      payload[2][0].isWater = true;
      payload[3][0].isWater = true;
      payload[4][0].isSet = true;
      payload[5][0].isSet = true;
      payload[6][0].isSet = true;
      payload[7][0].isSet = true;
      payload[4][1].isSet = true;
      payload[5][1].isWater = true;
      payload[6][1].isWater = true;
      payload[7][1].isSet = true;
      payload[7][2].isSet = true;

      const { it, expect } = runSaga(sagas.run());

      it('shouldn\'t put action', ({ value }) => {
        expect(value).put({ type: types.SET.request, payload });
      });
    });
  });
});
