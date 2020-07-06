import React, { useState } from 'react'
import { BaseLayout } from '../components/shared/layout/BaseLayout'
import { IIdentity, IPage, ROUTE } from '../types'
import { LoginForm } from '../components/features/auth/LoginForm'
import { useLogin } from '../components/features/auth/hooks/useLogin'
import { Redirect } from 'react-router-dom'

export function LoginPage(props: IPage): React.ReactElement {
    const [ identity, setIdentity ] = useState<Partial<IIdentity> | null>(null)
    const { user } = useLogin(identity)

    return (
        <BaseLayout {...props} >
            {user && <Redirect to={ROUTE.DASHBOARD}/>}
            <LoginForm onValidData={(data) => setIdentity(data)}/>
        </BaseLayout>
    )
}