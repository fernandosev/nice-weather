import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules/rootReducer';
import sagas from './modules/rootSaga';

const persistConfig = {
  key: 'niceweather_v1',
  version: 1,
  whitelist: ['weather'],
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let sagaMiddleware = createSagaMiddleware();

const middleware = [
  ...getDefaultMiddleware({
    thunk: false,
    serializableCheck: false,
  }),
  sagaMiddleware,
];

const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

let persistor = persistStore(store);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./modules/rootReducer', () => {
    const newRootReducer = require('./modules/rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

sagaMiddleware.run(sagas);

export type AppDispatch = typeof store.dispatch;

export {store, persistor};
