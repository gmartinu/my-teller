import Dexie from 'dexie';
var db = new Dexie('myteller');

/**
 * Banco de dados, sempre que a estrutura for alterada, o version
 * deverá subir um número
 */
db.version(2).stores({
  recebimentos: `++id, descricao, valor, recursivo, parcelas, data_inicio, data_vencimento`,
  contas: `++id, descricao, valor, recursivo, parcelas, mes_referencia`,
});

export default db;
