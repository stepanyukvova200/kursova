import { createEntitySlice, EntityState } from '../reducer.utils';
import { setGrainBin, setIndexOfActiveSuspension, setIndexOfActiveSensor } from './actions'; // Переконайся, що ці actions експортуються з файлу actions.ts

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
      .addCase(setIndexOfActiveSensor, (state, action) => {
        state.entity = { ...state.entity, indexOfActiveSensor: action.payload };
      })
      .addCase(setIndexOfActiveSuspension, (state, action) => {
        state.entity = { ...state.entity, indexOfActiveSuspension: action.payload };
      })
      .addCase(setGrainBin, (state, action) => {
        state.entity = { ...state.entity, grainBin: action.payload };
      });
  },
});

// Експортуємо actions
export const { reset } = actions; // експорт reset, якщо він є
export { setGrainBin };
export { setIndexOfActiveSuspension }// Додаємо експорт setGrainBin
export { setIndexOfActiveSensor }

export { reducer };
