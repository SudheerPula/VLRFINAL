import React from 'react';
import { useDispatch } from 'react-redux';

export const useAuthenticateUser = (login) =>{
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');

    React.useEffect(async() =>{
        if(!login.authenticated && token){
            const res = await dispatch(fetchTokenInfo())
        }
    })

}