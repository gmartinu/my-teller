import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { getRoutes } from 'utils';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    height: '100%',
  },
}));

export default function Auth() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Switch>
        {getRoutes('/auth')}
        <Redirect from="/auth" to="/auth/login" />
      </Switch>
    </div>
  );
}
