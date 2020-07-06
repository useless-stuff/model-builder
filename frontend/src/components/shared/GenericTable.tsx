import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { TableFooter } from '@material-ui/core'
import { ITableProps } from '../../types'

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            width: '100%',
        },
        table: {},
        head: {},
        body: {
            cursor: 'pointer',
            p: {
                padding: '10px',
            },
        },
        footer: {},
        pagination: {
            display: 'flex',
            justifyContent: 'flex-end',
        },
    }),
)

export const GenericTable: React.FC<ITableProps> = (props) => {
    const { tableClass, data } = props
    const { cols, rows } = data
    const classes = useStyles()

    return (
        <TableContainer component={Paper} className={classes.container}>
            <Table className={`${tableClass} ${classes.table}`}>
                <TableHead className={classes.head}>
                    <TableRow>
                        {cols.map((title, index) => (
                            <TableCell key={index}>{title}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody className={classes.body}>
                    {rows.length === 0 && <TableRow><TableCell>No content found</TableCell></TableRow>}
                    {rows.map((row, index) => (
                        <TableRow key={index} hover={!!row.id}>
                            {Object.keys(row).map((key: string, i: number) => (
                                <TableCell key={i}>{row[key]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter className={classes.footer}>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}
