import React from 'react'
import { Controller } from 'react-hook-form'

import {
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
  },
}))

const SelectInput = ({
  control,
  label,
  name,
  options
}) => {
  const classes = useStyles()

  return (
    <Controller
      render={({ field: { onChange, value, ref }, fieldState: { invalid, error } }) => (
        <FormControl
          className={classes.formControl}
          error={invalid}
          variant="outlined">
          <InputLabel>{label}</InputLabel>
          <Select
            label={label}
            value={value}
            onChange={onChange}
            inputRef={ref}
          >
            <MenuItem selected value=""><em>None</em></MenuItem>

            {options.map(option => {
              return (
                <MenuItem
                  key={option.id}
                  value={option.id}
                >
                  {option.name}
                </MenuItem>
              )
            })}
          </Select>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
      name={name}
      control={control}
    />
  )
}

export default SelectInput
