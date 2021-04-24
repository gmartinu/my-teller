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
  Divider,
} from '@material-ui/core';
import {
  ChevronLeft,
  ExpandLess,
  ExpandMore,
  Menu,
  VerticalAlignBottom,
  VerticalAlignTop,
} from '@material-ui/icons';
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
  flex: {
    display: 'flex',
    justifyContent: 'flex-end',
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

  const handleDrawer = () => {
    return setDrawer(!drawer);
  };

  const redirectClick = (layout, path) => {
    handleDrawer();
    return history.push(layout + path);
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
        <>
          {key !== 0 ? <Divider /> : null}
          <ListItem
            button
            onClick={() => redirectClick(prop.layout, prop.path)}
            key={key}
          >
            <ListItemText primary={prop.name} disableTypography={true} />
          </ListItem>
        </>
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
            onClick={handleDrawer}
            edge="start"
            className={clsx(classes.menuButton, drawer && classes.hide)}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            My Teller - {getActiveRoute().name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        open={drawer}
        onClose={handleDrawer}
      >
        <Box p={1} className={[classes.toolbar, classes.flex]}>
          <IconButton onClick={handleDrawer}>
            <ChevronLeft />
          </IconButton>
        </Box>
        <Divider />
        <Box p={2} pt={0} className={classes.mainBox}>
          <List component="nav">{createLinks(routes)}</List>
        </Box>
        <Box m={2} mb={0}>
          <Button
            startIcon={<VerticalAlignBottom />}
            color="primary"
            onClick={() => console.log('importar')}
            label="Importar"
            fullWidth
          />
        </Box>
        <Box m={2}>
          <Button
            startIcon={<VerticalAlignTop />}
            color="primary"
            onClick={() => console.log('exportar')}
            label="Exportar"
            fullWidth
          />
        </Box>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.internalContent}>
          <Switch>
            {getRoutes('/in')}
            {getForms('/in')}
            <Redirect from="/" to="/in/dashboard" />
          </Switch>
        </div>
      </main>
    </div>
  );
}
