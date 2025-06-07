import { createEntitySlice, EntityState } from '../reducer.utils';
import { setSilosIndex } from './actions'; // Переконайся, що ці actions експортуються з файлу actions.ts

// Початковий стан
export const initialState: EntityState<any> = {
  loading: false,
  errorMessage: null,
  updateSuccess: false,
  updating: false,
  entities: [],
  entity: {},
};

// Створення slice з обробкою дій
const { reducer, actions } = createEntitySlice({
  name: 'example',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setSilosIndex, (state, action) => {
        state.entity = { silos: action.payload };
      })
  },
});

// Експортуємо actions
export const { reset } = actions; // експорт reset, якщо він є
export { setSilosIndex };

export { reducer };
