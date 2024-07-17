import {configureStore,combineReducers} from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import { persistReducer,persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const rootReducer = combineReducers({
    auth: authReducer
});

const persistConfig = {
    key: 'root',
    storage,
    version:1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore(
    {reducer:persistedReducer
    }
);

export const persistor = persistStore(store);
