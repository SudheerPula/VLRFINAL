import { combineReducers } from '@reduxjs/toolkit';
import adminSlice from './admin';
import inventorySlice from './inventory';
import loginSlice from './login';


const appReducer = combineReducers({
    login: loginSlice.reducer,
    inventory: inventorySlice.reducer,
    admin: adminSlice.reducer
});

export default function rootReducer(state, action){
    return appReducer(state, action);
}