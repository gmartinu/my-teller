import { DataModel } from '../main';

export interface ContasInterface {
  id?: number;
  descricao: string;
  valor: number;
  recursivo: boolean;
  parcelas?: number;
  mes_referencia: number;
}

class ContasModel extends DataModel {
  async put(Model: ContasInterface) {
    return await this._put(Model);
  }
}

export const contasModel = new ContasModel('contas');
