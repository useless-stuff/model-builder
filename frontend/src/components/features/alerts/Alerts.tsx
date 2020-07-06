import React from 'react'
import { Alert, AlertTitle } from '@material-ui/lab'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { IAlert, IRootStore } from '../../../types'
import { setAlertShowed } from './state/alertsSlice'

const useStyles = makeStyles(() =>
    createStyles({
        alert: {
            position: 'fixed',
            width: '100vw',
            zIndex: 10,
            padding: '6px 40px 6px 20px',
            borderRadius: 0,
        },
    }),
)

export function Alerts(): React.ReactElement {
    const dispatch = useDispatch()
    const alerts = useSelector((store: IRootStore) => store.alerts.filter((message) => !message.showed))
    const classes = useStyles()

    return (
        <div>
            {alerts.map((alert: IAlert, key: number) => (
                <Alert
                    variant="filled"
                    key={key}
                    severity={alert.severity}
                    onClose={() => dispatch(setAlertShowed(alert))}
                    className={classes.alert}
                >
                    <AlertTitle>{alert.title}</AlertTitle>
                    {alert.message}
                </Alert>
            ))}
        </div>
    )
}
