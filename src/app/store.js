import { configureStore } from '@reduxjs/toolkit';
import {
  employeesReducer,
  formValidationReducer,
  authenticationReducer,
  fetchReducer,
  changeStatusReducer,
} from '../features';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = {
  authentication: authenticationReducer,
  employees: employeesReducer,
  formValidation: formValidationReducer,
  fetch: fetchReducer,
  changeStatus: changeStatusReducer,
};

const persistedReducer = {};

const reducersToPersist = ['authentication'];

for (let r in rootReducer) {
  if (reducersToPersist.includes(r)) {
    const persistConfigForReducer = { ...persistConfig, key: r };
    persistedReducer[r] = persistReducer(persistConfigForReducer, rootReducer[r]);
  } else {
    persistedReducer[r] = rootReducer[r];
  }
}

const store = configureStore({
  reducer: persistedReducer,
});

let persistor = persistStore(store);

export { store, persistor };
