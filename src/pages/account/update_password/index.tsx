import React, { useState, useEffect } from 'react'
import { fbAuth, fbDb, fbFunc } from '../../../../functions/firebase'
import Layout from '../../../components/layout'
import {
    Button,
    CssBaseline,
    Grid,
    makeStyles,
    Container,
} from '@material-ui/core'
import TextFieldEl from '../../../components/grid/textFieldEl'
import { useForm } from 'react-hook-form'
import { vldRules } from '../../../utils/validationRule'
import { useRouter } from 'next/router'

const getParameterByName = (name: string) => {
    const url = window.location.href
    name = name.replace(/[[\]]/g, '\\$&')
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url)

    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

const Action = (): React.ReactElement => {
    const router = useRouter()
    const classes = useStyles()
    const [state, setState] = useState<{
        mode: string
        actionCode: string
    } | null>(null)
    const [newPassword, setNewPassword] = useState<string>('')
    const [, setConfirmPassword] = useState<string>('')
    const { register, errors } = useForm({
        mode: 'onChange',
        criteriaMode: 'all',
    })

    useEffect(() => {
        const mode = getParameterByName('mode')
        const actionCode = getParameterByName('oobCode')
        if (!mode || !actionCode) {
            throw new Error('invalid url')
        }
        setState({
            mode,
            actionCode,
        })
    }, [])

    const onUpdatePassword = (): void => {
        fbAuth.verifyPasswordResetCode(state.actionCode).then((email) => {
            fbAuth
                .confirmPasswordReset(state.actionCode, newPassword)
                .then(async () => {
                    await fbAuth.signInWithEmailAndPassword(email, newPassword)
                    console.log('送信開始')
                    //await sendCompletionEmail
                    const mailer = fbFunc.httpsCallable('sendMail')
                    mailer({ email: email })
                        .then(() => {
                            console.log('送信成功')
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                    setTimeout(() => {
                        router.push('/account/update_password/complete')
                    }, 3000)
                })
                .catch((error) => {
                    console.log(error)
                })
        })
    }

    // const sendCompletionEmail = () => {
    //     console.log('送信中')
    //     const mailer = fbFunc.httpCallable('sendMail')
    //     mailer()
    //         .then(() => {
    //             console.log('送信成功')
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }

    return (
        <Layout title="パスワード再設定">
            {state?.mode === 'resetPassword' ? (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Grid container spacing={2}>
                        <TextFieldEl
                            name="newPassword"
                            label="新しいパスワード"
                            id="newPassword"
                            autoComplete="newPassword"
                            type="password"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setNewPassword(e.target.value)
                            }}
                            inputRef={register({
                                required: vldRules.required,
                                minLength: vldRules.checkMinLength,
                                pattern: vldRules.checkAlphanumeric,
                            })}
                            error={Boolean(errors.newPassword)}
                            errors={errors}
                        />
                    </Grid>
                    <Grid container spacing={2}>
                        <TextFieldEl
                            name="confirmPassword"
                            label="パスワード確認"
                            id="confirmPassword"
                            autoComplete="confirmPassword"
                            type="password"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setConfirmPassword(e.target.value)
                            }}
                            inputRef={register({
                                required: vldRules.required,
                                validate: (value) =>
                                    newPassword === value ||
                                    '確認用パスワードが一致しません。',
                            })}
                            error={Boolean(errors.confirmPassword)}
                            errors={errors}
                        />
                    </Grid>
                    <Button
                        className={classes.submit}
                        variant="contained"
                        color="primary"
                        onClick={onUpdatePassword}
                    >
                        設定する
                    </Button>
                </Container>
            ) : state?.mode === 'signIn' ? (
                'now singining...'
            ) : (
                <div>error: modeが選択されていない不正なURLです。</div>
            )}
        </Layout>
    )
}

export default Action
