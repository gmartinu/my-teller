import React from 'react';
import clsx from 'clsx';
import { Switch, Redirect, useHistory } from 'react-router-dom';
import { getCollapseStates, getRoutes, getActiveRoute, getForms } from 'utils';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  CssBaseline,
  Drawer,
  Toolbar,
  Typography,
  Box,
  ListItem,
  ListItemText,
  Collapse,
  List,
  IconButton,
} from '@material-ui/core';
import {  ExpandLess, ExpandMore, ExitToApp, Menu} from '@material-ui/icons';
import { Button } from 'components';
import routes from 'routes';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    width: `calc(100%)`,

    // [theme.breakpoints.up('sm')]: {
    //   width: `calc(100% - ${drawerWidth}px)`,
    //   marginLeft: drawerWidth,
    // },
  },
  // menuButton: {
  //   marginRight: theme.spacing(2),
  //   [theme.breakpoints.up('sm')]: {
  //     display: 'none',
  //   },
  // },
  // necessary for content to be below app bar
  toolbar: {
    height: 56,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    boxSizing: 'border-box',
  },
  internalContent: {
    padding: theme.spacing(3),
    boxSizing: 'border-box',
    height: `calc(100% - 56px)`,
  },
  listItem: {
    padding: 0,
  },
  listCollapse: {
    marginTop: 16,
  },
  listText: {
    fontSize: 16,
  },
  mainBox: {
    height: '100%',
    boxSizing: 'border-box',
  },
  tony: {
    width: 60,
    height: 60,
    borderRadius: 180,
  },
  dados: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  nome: {
    fontWeight: 'bold',
  },
  cargo: {
    color: '#818286',
  },
  dados_wrapper: {
    marginBottom: 0,
  },
  listAll: {
    marginTop: 16,
    padding: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
}));

export default function Auth() {
  const classes = useStyles();
  const [state, setState] = React.useState({ ...getCollapseStates() });
  const [drawer, setDrawer] = React.useState(false);
  const history = useHistory();

  const changeState = (st) => {
    // setState(_v => ({..._v, ...st}))
    setState(() => ({ ...st }));
  };

  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.norender) {
        return null;
      }
      if (prop.collapse) {
        var st = {};
        st[prop['state']] = !state[prop.state];
        return (
          <div key={key}>
            <ListItem
              className={classes.listAll}
              button
              onClick={() => changeState(st)}
            >
              <ListItemText
                style={{ fontWeight: 'bold', fontSize: 18, flex: 'unset' }}
                primary={prop.name}
                disableTypography={true}
              />
              {state[prop.state] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse timeout="auto" in={state[prop.state]} unmountOnExit>
              <List className={classes.listItem} component="div">
                {createLinks(prop.views)}
              </List>
            </Collapse>
          </div>
        );
      }
      return (
        <ListItem
          className={classes.listItem}
          button
          onClick={() => history.push(prop.layout + prop.path)}
          key={key}
        >
          <ListItemText
            className={classes.listText}
            primary={prop.name}
            disableTypography={true}
          />
        </ListItem>
      );
    });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar style={{ minHeight: 56 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setDrawer(true)}
            edge="start"
            className={clsx(classes.menuButton, drawer && classes.hide)}
          >
           <Menu/>
          </IconButton>
          <Typography variant="h6" noWrap>
            {getActiveRoute().name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        open={drawer}
        onClose={() => setDrawer(false)}
      >
        <Box p={3} className={classes.mainBox}>
          <List component="nav">{createLinks(routes)}</List>
        </Box>
        <Box m={2}>
          <Button
            startIcon={<ExitToApp />}
            color="primary"
            onClick={() => history.push('/auth/login')}
            label="Logout"
            fullWidth
          />
        </Box>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.internalContent}>
          <Switch>
            {getRoutes('/internal')}
            {getForms('/internal')}
            <Redirect from="/internal" to="/internal/os_abertas" />
          </Switch>
        </div>
      </main>
    </div>
  );
}
