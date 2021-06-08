import { configureStore as configureToolkitStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import rootReducer from './reducers';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';

const middleware = [
    ...getDefaultMiddleware({
        serializableCheck: false
    }),
    reduxPromiseMiddleware
];

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['persisted'],
    storageReconciler: autoMergeLevel1
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export function configureStore(initialState = {}){
    return configureToolkitStore({
        reducer: persistedReducer,
        middleware,
        preloadedState: initialState
    });
};

export default configureStore;