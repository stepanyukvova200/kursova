/* eslint-disable import/no-cycle */
import { loadingBarMiddleware, loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import {
  grainBin,
  cardViewType,
  silosIndex,
} from './reducers';

import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import grainBinsReducer from './slices/grainBinsSlice';

const reducer: ReducersMapObject = {
  loadingBar,
  grainBin,
  cardViewType,
  silosIndex,
  grainBins: grainBinsReducer,
};

// TODO:CHECK if we need middlewares
// import errorMiddleware from './error-middleware';
// import notificationMiddleware from './notification-middleware';
// import loggerMiddleware from './logger-middleware';

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(loadingBarMiddleware()),
  // TODO:CHECK if we need middlewares
  // .concat(errorMiddleware, notificationMiddleware, loadingBarMiddleware(), loggerMiddleware),
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
