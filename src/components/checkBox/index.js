import { Checkbox, FormControlLabel } from '@material-ui/core';

const CheckedBox = (props) => {
  return (
    <Checkbox
      {...props}
      onChange={(e) =>
        props.onChange({
          ...e,
          target: {
            name: e.target.name,
            value: e.target.checked,
          },
        })
      }
    />
  );
};

export default function FormControlCheckBox(props) {
  return (
    <FormControlLabel
      style={{ color: 'black' }}
      control={
        <CheckedBox
          checked={props.value}
          onChange={props.onChange}
          name={props.name}
          color="primary"
        />
      }
      label={props.label}
    />
  );
}
