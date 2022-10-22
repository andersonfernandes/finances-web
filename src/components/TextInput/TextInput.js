import React from 'react'
import { Controller } from 'react-hook-form'

import {
  FormControl,
  TextField,
} from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
  },
}))

const TextInput = ({
  control,
  label,
  name,
  inputProps,
}) => {
  const classes = useStyles()

  return (
    <Controller
      render={({ field: { onChange, value, ref }, fieldState: { invalid, error } }) => (
        <FormControl className={classes.formControl}>
          <TextField
            variant="outlined"
            value={value}
            label={label}
            inputRef={ref}
            error={invalid}
            helperText={error?.message}
            onChange={onChange}
            InputProps={inputProps}
          />
        </FormControl>
      )}
      name={name}
      control={control}
    />
  )
}

export default TextInput
