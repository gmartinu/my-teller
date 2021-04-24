import { InputAdornment, TextField } from '@material-ui/core';
import React from 'react';
import CurrencyInput from 'react-currency-masked-input';

export default function NewTextField(props) {
  let inputProps = props.perc
    ? {
        startAdornment: <InputAdornment position="start"> % </InputAdornment>,
      }
    : {
        startAdornment: <InputAdornment position="start"> R$ </InputAdornment>,
      };
  if (props.money || props.perc) {
    return (
      <TextField
        {...props}
        InputProps={{
          inputComponent: CurrencyInput,
          ...inputProps,
        }}
        onChange={(e, v) =>
          props.onChange({
            target: {
              name: props.name,
              value: v,
            },
          })
        }
        fullWidth
        id={props.name}
      />
    );
  } else {
    return <TextField {...props} fullWidth id={props.name} />;
  }
}
