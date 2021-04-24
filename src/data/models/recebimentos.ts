import { DataModel } from '../main';

export interface RecebimentosInterface {
  id?: number;
  descricao: string;
  valor: number;
  recursivo: boolean;
  parcelas?: number;
  data_inicio: Date;
  data_vencimento: Date;
}

class RecebimentosModel extends DataModel {
  async put(Model: RecebimentosInterface) {
    return await this._put(Model);
  }
}

export const recebimentosModel = new RecebimentosModel('recebimentos');
