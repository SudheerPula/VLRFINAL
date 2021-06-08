import Axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions'

export const axios = Axios.create({
    baseURL: 'https://api.vlrportal.com/vlrservices/',
    headers: { 
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    adapter: cacheAdapterEnhancer(Axios.defaults.adapter)
})