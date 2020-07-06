import React, { PropsWithChildren } from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#03A9F4',
        },
        secondary: {
            main: '#1565c0',
        },
    },
})

export function AppThemeProvider(props: PropsWithChildren<{}>) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {props.children}
        </ThemeProvider>
    )
}
