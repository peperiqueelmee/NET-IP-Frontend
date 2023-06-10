import { configureStore } from '@reduxjs/toolkit';
import { employeesReducer, formValidationReducer, authenticationReducer } from '../features';
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
};

const persistedReducer = {};

for (let r in rootReducer) {
  persistedReducer[r] = persistReducer(persistConfig, rootReducer[r]);
}

const store = configureStore({
  reducer: persistedReducer,
});

let persistor = persistStore(store);

export { store, persistor };
