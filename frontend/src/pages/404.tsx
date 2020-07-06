import React from 'react'

import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { ROUTE } from '../types'

export function NotFoundPage(): React.ReactElement {
    return (
        <>
            <h1>Not Found</h1>
            <Button variant="contained" color="primary" size="large" component={Link} to={ROUTE.LOGIN}>
                Home page
            </Button>
        </>
    )
}