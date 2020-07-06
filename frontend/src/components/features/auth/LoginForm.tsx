import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useForm, Controller } from 'react-hook-form'
import { Button, TextField, Card } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            padding: '5%',
            width: '50%',
            margin: '5% auto',
        },
        loginForm: {
            width: '100%',
            display: 'flex',
            flexFlow: 'column nowrap',
        },
        loginPass: {
            marginTop: theme.spacing(5),
            marginBottom: theme.spacing(5),
        },
        loginAlert: {
            width: '90%',
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            [theme.breakpoints.up('sm')]: {
                width: '70%',
            },
        },
        signUpLink: {
            marginTop: theme.spacing(2),
        },
        signUpRoute: {
            display: 'inline-block',
            marginRight: theme.spacing(2),
        },
    }),
)

interface IProps {
    onValidData: (data: Record<string, string>) => unknown
}

export const LoginForm: React.FC<IProps> = (props): React.ReactElement => {
    const { handleSubmit, errors, control } = useForm()
    const classes = useStyles()
    const onSubmit = (data: Record<string, string>) => {
        if (data.email && data.password) {
            props.onValidData(data)
        }
    }
    return (
        <>
            <Card className={classes.card}>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.loginForm}>
                    <Controller
                        as={TextField}
                        name="email"
                        type="email"
                        label="Email"
                        variant="outlined"
                        defaultValue=""
                        control={control}
                        rules={{ required: true }}
                    />
                    {errors.email && errors.email.type === 'required' && <span>This field is required</span>}
                    <Controller
                        as={TextField}
                        name="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        defaultValue=""
                        control={control}
                        rules={{ required: true, minLength: 8 }}
                        className={classes.loginPass}
                    />
                    {errors.password && errors.password.type === 'required' && <span>This field is required</span>}
                    {errors.password && errors.password.type === 'minLength' && (
                        <span>This field requires minimum 8 characters</span>
                    )}
                    <Button type="submit" variant="contained" color={'primary'} disableElevation>
                        Login
                    </Button>
                </form>
            </Card>
        </>
    )
}
