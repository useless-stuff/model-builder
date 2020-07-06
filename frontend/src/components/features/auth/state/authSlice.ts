import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ALERT_TYPE, IAuthStore, IThunk, IUser, LOCAL_STORAGE_KEY } from '../../../../types'
import { pushAlertAction } from '../../alerts/state/alertsSlice'
import { login, readUser } from '../../../../services/modelbuilder'

const defaultState = {
    loading: false,
    error: null,
    data: {
        token: null,
        user: null,
    },
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: defaultState,
    reducers: {
        loadingAction: (state: IAuthStore, action: PayloadAction<{ isLoading: boolean }>) => {
            state.loading = action.payload.isLoading
        },
        errorAction: (state: IAuthStore, action: PayloadAction<{ message: string }>) => {
            state.loading = defaultState.loading
            state.data = { token: defaultState.data.token, user: defaultState.data.user }
            state.error = action.payload.message
        },
        setAuthData: (state: IAuthStore, action: PayloadAction<{ token: string; user: IUser }>) => {
            state.error = defaultState.error
            state.loading = defaultState.loading
            state.data.user = action.payload.user
            state.data.token = action.payload.token
        },
        resetSessionAction: (state: IAuthStore, action: PayloadAction) => {
            state.error = defaultState.error
            state.loading = defaultState.loading
            state.data = defaultState.data
        },
    },
})

export const { loadingAction, errorAction, setAuthData, resetSessionAction } = authSlice.actions

export const authUserThunk = (email: string, password: string): IThunk => async (dispatch, state) => {
    try {
        dispatch(loadingAction({ isLoading: true }))
        // Generate and store token
        const token = await login(email, password)
        localStorage.setItem(LOCAL_STORAGE_KEY.USER_JWT, token)

        // Fetch and store user details
        const user = await readUser()
        dispatch(setAuthData({ token: token, user: user }))
    } catch (error) {
        dispatch(pushAlertAction({
            severity: ALERT_TYPE.ERROR,
            title: 'Authentication error',
            message: 'Invalid credential provided',
        }))
        dispatch(errorAction({ message: error.message }))
    }
}
