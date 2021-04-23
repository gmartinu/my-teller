import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export default function InputAdornments(props) {
  const {
    filled,
    outline,
    id,
    value,
    onChange,
    name,
    label,
    children,
    fullWidth,
    formStyle,
  } = props;

  const [values, setValues] = React.useState({
    InputComponent: filled ? FilledInput : outline ? OutlinedInput : Input,
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const { InputComponent } = values;

  return (
    <FormControl style={formStyle} fullWidth={fullWidth ? fullWidth : false}>
      <InputLabel htmlFor="standard-adornment-password">
        {label || children}
      </InputLabel>
      <InputComponent
        id={id}
        inputProps={{
          'aria-label': label || children,
        }}
        type={values.showPassword ? 'text' : 'password'}
        value={value}
        onChange={(e) =>
          onChange({
            target: {
              name: name,
              value: e.target.value,
            },
          })
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

InputAdornments.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
  children: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  filled: PropTypes.bool,
  outline: PropTypes.bool,
  fullWidth: PropTypes.bool,
};
