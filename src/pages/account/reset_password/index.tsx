import React, { useState } from 'react'
import Layout from '../../../components/layout'
import { fbAuth } from 'functions/firebase'
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

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

const ResetPassword = (): React.ReactElement => {
    const classes = useStyles()
    const [email, setEmail] = useState<string>('')
    const [, setLoading] = useState<boolean>(false)
    const { register, errors } = useForm({
        mode: 'onChange',
        criteriaMode: 'all',
    })
    const router = useRouter()

    const onResetPassword = async (): Promise<void> => {
        try {
            setLoading(true)
            fbAuth.sendPasswordResetEmail(email)
            setTimeout(() => {
                router.push({
                    pathname: '/account/reset_password/complete',
                    query: { email: email },
                })
            }, 1000)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout title="パスワード変更">
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Grid container spacing={2}>
                    <TextFieldEl
                        name="email"
                        label="メールアドレス"
                        id="email"
                        autoComplete="email"
                        type="text"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setEmail(e.target.value)
                        }}
                        inputRef={register({
                            required: vldRules.required,
                            pattern: vldRules.checkEmail,
                        })}
                        error={Boolean(errors.email)}
                        errors={errors}
                    />
                    <p>
                        ※ご指定のメールアドレスにパスワード再設定リンクを添付したメールを送信します。
                    </p>
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={onResetPassword}
                >
                    送信する
                </Button>
            </Container>
        </Layout>
    )
}
export default ResetPassword
