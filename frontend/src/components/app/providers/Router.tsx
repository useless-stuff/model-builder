import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { ROUTE } from '../../../types'
import { LoginPage } from '../../../pages/login'
import { DashboardPage } from '../../../pages/dashboard'
import { NotFoundPage } from '../../../pages/404'
import { useSession } from '../../features/auth/hooks/useSession'

type IRouteProps = {
    page: React.ElementType
    exact?: boolean
    path?: ROUTE
    match?: object
}

export const AppRouterProvider: React.FC = () => (
    <Router>
        <Switch>
            <PublicRoute exact path={ROUTE.LOGIN} page={LoginPage}/>
            <PrivateRoute exact path={ROUTE.DASHBOARD} page={DashboardPage}/>
            <PublicRoute page={NotFoundPage}/>
        </Switch>
    </Router>
)

const PublicRoute: React.FC<IRouteProps> = (props) => {
    const { page: Page, ...rest } = props
    return <Route {...rest} render={(props): React.ClassicElement<unknown> => <Page {...props} isPrivate={false}/>}/>
}

const PrivateRoute: React.FC<IRouteProps> = (props): React.ReactElement => {
    const { logged, error } = useSession()
    const { page: Page, ...rest } = props
    return (
        <Route
            {...rest}
            render={(props) => {
                if (logged) {
                    return <Page {...props} isPrivate={true}/>
                }
                if (error) {
                    return <Redirect to={{ pathname: ROUTE.LOGIN, state: { from: props.location } }}/>
                }
            }}
        />
    )
}
