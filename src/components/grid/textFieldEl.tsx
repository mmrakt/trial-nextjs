import React from 'react'
import { TextField, Grid } from '@material-ui/core'
import { ErrorMessage } from '@hookform/error-message'

type IProps = {
    name: string
    label: string
    id: string
    autoComplete: string
    type: string
    value?: string
    multiline?: boolean
    rows?: number
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    inputRef?: (ref: any) => void
    error?: boolean
    errors?: any
    render?: (data: { message: string; messages?: any }) => React.ReactNode
}
const TextFieldEl = (props: IProps): React.ReactElement => {
    const {
        name,
        label,
        id,
        autoComplete,
        type,
        value,
        multiline,
        rows,
        onChange,
        inputRef,
        error,
        errors,
        render,
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
                value={value}
                multiline={multiline}
                rows={rows}
                autoComplete={autoComplete}
                onChange={onChange}
                inputRef={inputRef}
                error={error}
            />
            <ErrorMessage errors={errors} name={name} render={render} />
        </Grid>
    )
}

export default TextFieldEl
