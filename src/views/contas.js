/* eslint-disable no-unused-vars */
import {
  Grid,
  Paper,
  makeStyles,
  ButtonBase,
  Typography,
  IconButton,
  Box,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@material-ui/core';
import { Add, Close, Create, Delete } from '@material-ui/icons';
import db from 'data/db';
import React, { useContext, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { TextField, Checkbox } from 'components';
import { contasModel } from 'data/models/contas';
import { AppContext } from 'index';

const useStyles = makeStyles(() => ({
  flex: {
    display: 'flex',
  },
  overflow: {
    overflow: 'auto',
  },
  gridFix: {
    margin: 0,
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  fullWidth: {
    width: '100%',
  },
  full: {
    width: '100%',
    height: '100%',
  },
  addButton: {
    fontSize: 50,
  },
  title: {
    flexGrow: 1,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function Contas() {
  const classes = useStyles();

  const { dialog } = useContext(AppContext);

  const [addEdit, setAddEdit] = useState(false);
  const handleAddEdit = () => {
    setState(defaultState);
    setAddEdit(!addEdit);
  };

  const contas = useLiveQuery(() => db.contas.toArray());

  const defaultState = {
    descricao: '',
    valor: '0.00',
    recursivo: false,
    parcelas: null,
    unico: false,
  };
  const [state, setState] = useState(defaultState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    return setState((_v) => ({
      ..._v,
      [name]: value,
    }));
  };

  const save = (e) => {
    e.preventDefault();
    contasModel.put(state);
    handleAddEdit();
  };

  const remove = (e, conta) => {
    e.stopPropagation();
    dialog.showConfirm(
      `Deseja remover a conta: ${conta.descricao} ?`,
      'Confirmação',
      () => {
        contasModel.delete(conta.id);
        if (addEdit) {
          setAddEdit(false);
        }
      }
    );
  };

  const edit = (e, conta) => {
    e.stopPropagation();
    setState(conta);
    setAddEdit(true);
  };

  return (
    <Grid
      container
      spacing={2}
      className={[classes.fullHeight, classes.gridFix]}
    >
      <Grid item xs={5} className={[classes.fullHeight, classes.flex]}>
        <Paper className={[classes.full, classes.overflow]}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Descrição</TableCell>
                <TableCell align="left">Valor</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contas?.map((conta, key) => (
                <TableRow hover onClick={(e) => edit(e, conta)} key={key}>
                  <TableCell>{conta.descricao}</TableCell>
                  <TableCell>{conta.valor.toBRL()}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={(e) => edit(e, conta)}
                      size="small"
                      aria-label="close"
                    >
                      <Create size="small" />
                    </IconButton>
                    <IconButton
                      onClick={(e) => remove(e, conta)}
                      size="small"
                      aria-label="close"
                    >
                      <Delete size="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
      <Grid item xs={7} className={[classes.fullHeight, classes.flex]}>
        <Paper className={classes.full}>
          {!addEdit ? (
            <ButtonBase onClick={handleAddEdit} className={classes.full}>
              <Add className={classes.addButton} color="primary" />
            </ButtonBase>
          ) : (
            <>
              <Box display="flex" p={2}>
                <Typography variant="h5" className={classes.title}>
                  {state.id ? 'Editar Conta' : 'Adicionar Conta'}
                </Typography>
                <IconButton
                  onClick={handleAddEdit}
                  size="small"
                  aria-label="close"
                >
                  <Close size="small" />
                </IconButton>
              </Box>
              <Divider />
              <form onSubmit={save}>
                <Box p={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        label="Descrição"
                        onChange={handleChange}
                        name="descricao"
                        value={state.descricao}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        type="number"
                        label="Valor"
                        money
                        onChange={handleChange}
                        name="valor"
                        value={state.valor}
                      />
                    </Grid>
                    <Grid item xs={4} className={classes.center}>
                      <Checkbox
                        label="Recursivo"
                        onChange={handleChange}
                        name="recursivo"
                        value={state.recursivo}
                      />
                    </Grid>
                    <Grid item xs={4} className={classes.center}>
                      <Checkbox
                        label="Único"
                        onChange={handleChange}
                        name="unico"
                        value={state.unico}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      {/* <TextField
                        label="Parcelas"
                        disabled={state.recursivo}
                        onChange={handleChange}
                        name="parcelas"
                        value={state.parcelas}
                      /> */}
                    </Grid>
                    <Grid item xs={12}>
                      <Box display="flex">
                        <Box flexGrow={1}>
                          <Button
                            onClick={handleAddEdit}
                            variant="contained"
                            color="primary"
                          >
                            Cancelar
                          </Button>
                        </Box>
                        <Box>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                          >
                            Salvar
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Contas;
