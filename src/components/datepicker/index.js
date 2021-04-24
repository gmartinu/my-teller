import moment from 'moment';
import 'moment/locale/pt-br';
import React from 'react';
import MomentUtils from '@date-io/moment';
import PropTypes from 'prop-types';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';

function DatePicker(props) {
  moment.locale('pt-br');
  const {
    fullWidth,
    dateTime,
    format,
    id,
    label,
    name,
    value,
    onChange,
    disabled,
    ...rest
  } = props;

  const DateTime = dateTime
    ? {}
    : {
        orientation: 'landscape',
      };

  const MainRest = {
    format: format,
    id: id,
    label: label,
    value: value,
    // style: { marginTop: 11 },
    disabled: disabled,
    onChange: (date) => {
      if (disabled) return;
      return onChange({
        target: {
          value: date?._d || '',
          name: name,
        },
      });
    },
    autoOk: true,
    fullWidth: fullWidth ? true : false,
    variant: 'inline',
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      {dateTime ? (
        <KeyboardDateTimePicker {...DateTime} {...MainRest} {...rest} />
      ) : (
        <KeyboardDatePicker {...DateTime} {...MainRest} {...rest} />
      )}
    </MuiPickersUtilsProvider>
  );
}

DatePicker.propTypes = {
  fullWidth: PropTypes.bool,
  format: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  dateTime: PropTypes.bool,
};

DatePicker.defaultProps = {
  dateTime: false,
  format: 'DD/MM/yyyy',
  label: 'Exemplo',
};

export default DatePicker;
