/* eslint-disable no-unused-vars */
import { Box, capitalize, Grid, Paper, useTheme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { Add } from '@material-ui/icons';
import { Menu } from 'components';
import db from 'data/db';
import { useLiveQuery } from 'dexie-react-hooks';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

function Dashboard() {
  const theme = useTheme();

  const [plotRec, setPlotRec] = useState(null);

  const recebimentos = useLiveQuery(() => db.recebimentos.toArray());
  const contas = useLiveQuery(() => db.contas.toArray());

  useEffect(() => {
    if (recebimentos && contas) {
      let final_obj_recebimento = [];

      for (let i = 1; i < 12; i++) {
        let date = moment().add(i, 'M');
        let name = date.format('MMMM');
        let ganhos = 0;
        let pagamentos = 0;
        recebimentos.forEach((recebimento) => {
          if (recebimento.recursivo) {
            return (ganhos += Number(recebimento.valor));
          }
          if (recebimento.data_inicio) {
            if (
              new Date(recebimento.data_inicio).getTime() <
                new Date(date.toString()).getTime() &&
              new Date(
                moment(recebimento.data_vencimento).add(1, 'M').toString()
              ).getTime() > new Date(date.toString()).getTime()
            ) {
              return (ganhos += Number(recebimento.valor));
            }
          }
        });
        contas.forEach((conta) => {
          if (conta.recursivo) {
            pagamentos += Number(conta.valor);
          }
        });
        final_obj_recebimento.push({
          name: capitalize(name),
          ganhos: ganhos,
          contas: pagamentos,
        });
      }
      console.log(final_obj_recebimento);
      setPlotRec(final_obj_recebimento);
    }
  }, [recebimentos, contas]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper>
            <Box p={2}>
              <ResponsiveContainer height={300} width="100%">
                <AreaChart data={plotRec}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    dataKey="ganhos"
                    stroke={theme.palette.primary.main}
                    fill={theme.palette.primary.main}
                    activeDot={{ r: 8 }}
                  />
                  <Area
                    dataKey="contas"
                    stroke={red[500]}
                    fill={red[500]}
                    activeDot={{ r: 8 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Menu
        type="fab"
        label="+"
        options={[
          { Icon: Add, label: 'Novo Recebimento', function: () => console },
          {
            Icon: Add,
            label: 'Nova Conta',
            function: () => console,
          },
        ]}
      />
    </>
  );
}

export default Dashboard;
