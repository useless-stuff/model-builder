import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'
import { IAlert } from '../../../../types'

export const alertsSlice = createSlice({
    name: 'alerts',
    initialState: [],
    reducers: {
        pushAlertAction: (state: IAlert[], action: PayloadAction<IAlert>) => {
            state.push({ ...action.payload, showed: false, id: uuid() })
        },
        setAlertShowed: (state: IAlert[], action: PayloadAction<IAlert>) => {
            const alert = state.find(alert => alert.id === action.payload.id)
            if (!alert) {
                return
            }
            alert!.showed = true
        }
    }
})

export const { pushAlertAction, setAlertShowed } = alertsSlice.actions
