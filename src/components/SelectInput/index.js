import React from 'react'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'

import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material'
import { makeStyles } from '@mui/styles'

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
						variant="standard"
						label={label}
						value={value}
						onChange={onChange}
						inputRef={ref}>
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

// TODO: Check control type
SelectInput.propTypes = {
	control: PropTypes.any,
	label: PropTypes.string,
	name: PropTypes.string,
	options: PropTypes.array,
}

export default SelectInput
