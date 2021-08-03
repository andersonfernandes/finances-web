import React, {
  useEffect,
  useState,
} from 'react'

import {
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core'

import { generateInputId } from '../../utils/formHelpers'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
  },
}))

const SelectInput = ({
  value,
  label,
  hasError,
  errorText,
  onInputChange,
  options,
  ...rest
}) => {
  const [inputId, setInputId] = useState(null)
  const classes = useStyles()

  useEffect(() => {
    setInputId(generateInputId(label))
  }, [label])


  return (
    <FormControl
      className={classes.formControl}
      error={hasError}
      variant="outlined">
      <InputLabel id={`${inputId}-label`}>{label}</InputLabel>
      <Select
        id={inputId}
        labelId={`${inputId}-label`}
        label={label}
        value={value}
        {...rest}
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
      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  )
}

export default SelectInput
