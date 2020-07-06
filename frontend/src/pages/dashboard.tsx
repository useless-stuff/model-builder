import React, { useState } from 'react'
import { IPage, IRootStore, ITableData, USER_ROLE } from '../types'
import { BaseLayout } from '../components/shared/layout/BaseLayout'
import { GenericTable } from '../components/shared/GenericTable'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(() =>
    createStyles({
        tableContainer: {
            width: '100%',
            margin: 'auto',
        },
        actionButton: {
            float: 'right',
            marginLeft: '20px',
        },
    }),
)

const cols = [ 'Model type', 'creation date' ]

export function DashboardPage(props: IPage): React.ReactElement {
    const [ tableData, setTableData ] = useState<ITableData>({ cols, rows: [] })
    const user = useSelector((store: IRootStore) => store.auth.data.user)
    const classes = useStyles()
    return (
        <BaseLayout {...props} >
            <h1>
                Dashboard
                <Button className={classes.actionButton} variant="contained">Create from blueprint</Button>
                {user?.role === USER_ROLE.ADMIN &&
                <Button className={classes.actionButton} variant="outlined">Create new blueprint</Button>}
            </h1>
            <div className={classes.tableContainer}>
                <GenericTable data={tableData}/>
            </div>
        </BaseLayout>
    )
}