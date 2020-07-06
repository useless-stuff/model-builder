import React from 'react'
import { ErrorsController } from './controllers/Errors'
import { AppThemeProvider } from './providers/Theme'
import { AppRouterProvider } from './providers/Router'
import { AppStoreProvider } from './providers/Store'

export const App: React.FC = () =>
    <AppThemeProvider>
        <ErrorsController>
            <AppStoreProvider>
                <AppRouterProvider/>
            </AppStoreProvider>
        </ErrorsController>
    </AppThemeProvider>

