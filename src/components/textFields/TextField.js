import React from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import { TextField } from '@material-ui/core';

export default function CustomTextField(props) {
  const {
    children,
    label,
    value,
    onChange,
    name,
    id,
    fullWidth,
    mask,
    maskChar,
    disabled,
    normalize,
    inputRef,
    InputProps,
  } = props;

  return (
    <>
      {mask ? (
        <InputMask
          onChange={(e) =>
            normalize
              ? onChange({
                  target: {
                    name: e.target.name,
                    value: normalize(e.target.value),
                  },
                })
              : onChange(e)
          }
          mask={mask}
          maskChar={maskChar}
          disabled={disabled ? true : false}
          value={value}
        >
          {() => (
            <TextField
              inputRef={inputRef}
              label={label || children}
              disabled={disabled ? true : false}
              fullWidth={fullWidth ? fullWidth : false}
              name={name}
              id={id || 'custom-text-field'}
              value={value}
            />
          )}
        </InputMask>
      ) : (
        <TextField
          onChange={onChange}
          inputRef={inputRef}
          disabled={disabled ? true : false}
          value={value}
          label={label || children}
          fullWidth={fullWidth ? fullWidth : false}
          name={name}
          id={id || 'custom-text-field'}
          InputProps={InputProps ? InputProps : null}
        />
      )}
    </>
  );
}

CustomTextField.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
  children: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  fullWidth: PropTypes.bool,
  mask: PropTypes.string,
  maskChar: PropTypes.string,
  disabled: PropTypes.bool,
  normalize: PropTypes.func,
  inputRef: PropTypes.object,
  InputProps: PropTypes.any,
};

CustomTextField.defaultProps = {
  maskChar: '',
};
