import { useEffect } from 'react'
import { IIdentity, IRootStore } from '../../../../types'
import { useDispatch, useSelector } from 'react-redux'
import { authUserThunk } from '../state/authSlice'

export function useLogin(identity: Partial<IIdentity> | null) {
    const dispatch = useDispatch()
    const loading = useSelector((store: IRootStore) => store.auth.loading)
    const error = useSelector((store: IRootStore) => store.auth.error)
    const user = useSelector((store: IRootStore) => store.auth.data)

    useEffect(() => {
        if (identity && identity.email && identity.password) {
            dispatch(authUserThunk(identity.email, identity.password))
        }
    }, [ identity, dispatch ])

    return { loading, error, user: user.user }
}
