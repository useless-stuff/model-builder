import { Provider } from 'react-redux'
import React from 'react'
import { store } from '../../../store'

export const AppStoreProvider: React.FC = (props): React.ReactElement =>
    <Provider store={store}>
        {props.children}
    </Provider>
