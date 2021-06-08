import { combineReducers } from '@reduxjs/toolkit';
import inventorySlice from './inventory';
import loginSlice from './login';

const appReducer = combineReducers({
    login: loginSlice.reducer,
    inventory: inventorySlice.reducer
});

export default function rootReducer(state, action){
    return appReducer(state, action);
}