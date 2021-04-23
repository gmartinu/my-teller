import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { TextField } from '@material-ui/core';

function NumberFormatCustom(props) {
  const { inputRef, onChange, prefix, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix={prefix}
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  prefix: PropTypes.string.isRequired,
};

export default function TextNumber(props) {
  const { children, label, value, onChange, name, id, ...other } = props;

  return (
    <TextField
      label={label || children}
      value={value}
      onChange={onChange}
      name={name}
      {...other}
      id={id || 'formatted-numberformat-input'}
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
    />
  );
}

TextNumber.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  children: PropTypes.string,
  value: PropTypes.string.isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
};
