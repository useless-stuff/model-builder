import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ALERT_TYPE, IRootStore, LOCAL_STORAGE_KEY } from '../../../../types'
import { pushAlertAction } from '../../alerts/state/alertsSlice'
import { readUser } from '../../../../services/modelbuilder'
import { setAuthData } from '../state/authSlice'

export const useSession = () => {
    const [ logged, setLogged ] = useState<boolean>(false)
    const [ error, setError ] = useState<boolean>(false)
    const storeToken = useSelector((store: IRootStore) => store.auth.data.token)
    const dispatch = useDispatch()

    // Session error
    useEffect(() => {
        if (!error) {
            return
        }
        localStorage.clear()
        dispatch(pushAlertAction({
            severity: ALERT_TYPE.ERROR,
            title: 'Authentication error',
            message: 'Your session is expired or invalid',
        }))
    }, [ error, dispatch ])

    // Restore session
    useEffect(() => {
        // Session is ready
        if (storeToken) {
            return setLogged(true)
        }

        // Restore session
        const restoreSession = async () => {
            const token = localStorage.getItem(LOCAL_STORAGE_KEY.USER_JWT) as string
            const user = await readUser()
            dispatch(setAuthData({ token, user }))
        }

        restoreSession().catch(() => setError(true))

    }, [ storeToken, dispatch ])


    return { logged, error }
}
