import React, {useEffect, useState} from 'react'

import {
  FormControl,
  makeStyles,
  TextField,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
  },
}))

const generateInputId = label => {
  const formatedLabel = label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/(^-|-$)/g,'')

    return `${Date.now}-${formatedLabel}`
}

const TextInput = ({
  value,
  label,
  hasError,
  errorText,
  onInputChange,
  ...rest
}) => {
  const [inputId, setInputId] = useState(null)
  const classes = useStyles()

  useEffect(() => {
    setInputId(generateInputId(label))
  }, [label])


  return (
    <FormControl className={classes.formControl}>
      <TextField
        id={inputId}
        variant="outlined"
        label={label}
        value={value}
        error={hasError}
        helperText={errorText}
        {...rest}
      />
    </FormControl>
  )
}

export default TextInput
