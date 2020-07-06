import React from 'react'
import { styled } from '@material-ui/core/styles'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { IPage } from '../../../types'
import { Alerts } from '../../features/alerts/Alerts'
import Image from '../../../assets/imgs/bg.png'

const StyledMainContent = styled('main')({
    flexGrow: 1,
    margin: '1rem 1rem',
    width: '98vw',
})

const useStyles = makeStyles(() =>
    createStyles({
        page: {
            backgroundImage: `url(${Image})`,
            minHeight: '100vh',
        },
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '100px',
            alignItems: 'center',
        },
    }),
)

export const BaseLayout: React.FC<React.PropsWithChildren<IPage>> = ({ children }) => {
    // const user = useSelector((store: IRootStore) => store.auth.data.user)
    const classes = useStyles()
    return (
        <div className={classes.page}>
            <Alerts/>
            <div className={classes.wrapper}>
                <StyledMainContent>{children}</StyledMainContent>
            </div>
        </div>
    )
}
