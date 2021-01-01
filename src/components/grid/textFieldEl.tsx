import React from 'react'
import { TextField, Grid } from '@material-ui/core'
import { ErrorMessage } from '@hookform/error-message'

type IProps = {
    name: string
    label: string
    id: string
    autoComplete: string
    type: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    inputRef: (ref: any) => void
    error: boolean
    errors: any
}
const TextFieldEl = (props: IProps): React.ReactElement => {
    const {
        name,
        label,
        id,
        autoComplete,
        type,
        onChange,
        inputRef,
        error,
        errors,
    } = props
    return (
        <Grid item xs={12}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id={id}
                label={label}
                name={name}
                type={type}
                autoComplete={autoComplete}
                onChange={onChange}
                inputRef={inputRef}
                error={error}
            />
            <ErrorMessage errors={errors} name={name} />
        </Grid>
    )
}

export default TextFieldEl
