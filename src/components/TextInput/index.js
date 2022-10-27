import React from 'react'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'

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
        <FormControl variant="standard" className={classes.formControl}>
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

// TODO: Check control type
TextInput.propTypes = {
  control: PropTypes.any,
  label: PropTypes.string,
  name: PropTypes.string,
  inputProps: PropTypes.object,
}

export default TextInput
