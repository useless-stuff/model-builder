import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { alertsSlice } from '../components/features/alerts/state/alertsSlice'
import { authSlice } from '../components/features/auth/state/authSlice'

export const store = configureStore({
    reducer: combineReducers({
        [alertsSlice.name]: alertsSlice.reducer,
        [authSlice.name]: authSlice.reducer,
    }),
})