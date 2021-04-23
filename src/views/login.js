import React from 'react';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import { Button, TextField, TextPass } from 'components';
// import { M_Login } from 'data';
import { AppContext } from 'index';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  paper: {
    width: '100%',
    padding: theme.spacing(3, 6),
    boxSizing: 'border-box',
  },
  button: {
    marginTop: theme.spacing(4),
  },
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const { snack } = React.useContext(AppContext);
  const [values, setValues] = React.useState({
    username: 'admin',
    password: 'admin',
  });

  React.useEffect(() => {
    localStorage.clear();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.password && values.username) {
      if(values.password === "admin" && values.username === "admin"){
        snack.success('Logado com Sucesso!', 1000);
        history.push('/internal/');
      }else{
        snack.error('Credenciais inválidas!', 2500);
      }
      // M_Login.login(values)
      //   .then((res) => {
          // snack.success('Logado com Sucesso!', 1000);
          // localStorage.setItem('token', `${res.token}`);
          // history.push('/internal');
      //   })
      //   .catch(() => {
      //     snack.error('Credenciais inválidas!', 2500);
      //   });
    }
  };

  return (
    <Grid
      className={classes.root}
      container
      justify="center"
      alignItems="center"
    >
      <Grid item xs={3}>
        <Paper elevation={0} className={classes.paper}>
          <form onSubmit={handleSubmit}>
            {/* <Box display="flex" justifyContent="center">
              <img width="100%" src={Full_logo} alt="Full-Logo" />
            </Box> */}
            <TextField
              label="Usuário"
              value={values.username}
              onChange={(e) =>
                setValues((_v) => ({ ..._v, username: e.target.value }))
              }
              fullWidth
            />
            <TextPass
              formStyle={{ marginTop: 10 }}
              label="Senha"
              fullWidth
              value={values.password}
              onChange={(e) =>
                setValues((_v) => ({ ..._v, password: e.target.value }))
              }
            />
            <Button
              disableElevation
              className={classes.button}
              fullWidth
              type="submit"
              label="login"
            />
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
