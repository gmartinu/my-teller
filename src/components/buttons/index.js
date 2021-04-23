import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const CustomButton = withStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(1),
  },
}))(Button);

export default function NewButton(props) {
  const {
    children,
    type,
    label,
    variant,
    onClick,
    className,
    color,
    fullWidth,
    disableElevation,
    startIcon,
    disabled,
  } = props;

  return (
    <CustomButton
      disableElevation={disableElevation}
      fullWidth={fullWidth}
      variant={variant}
      color={color}
      onClick={onClick}
      className={className}
      disabled={disabled}
      type={type}
      startIcon={startIcon}
    >
      {children || label}
    </CustomButton>
  );
}

NewButton.propTypes = {
  children: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.array,
  fullWidth: PropTypes.bool,
  disableElevation: PropTypes.bool,
  startIcon: PropTypes.object,
  disabled: PropTypes.bool,
};
NewButton.defaultProps = {
  variant: 'contained',
  label: 'Um Botão',
  color: 'primary',
  fullWidth: false,
  disableElevation: false,
};