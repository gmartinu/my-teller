import db from './db';
import { mutate } from 'swr';

export class DataModel {
  modelName: string = 'recebimentos';
  query = db.table(this.modelName);

  constructor(modelName: string) {
    this.modelName = modelName;
    this.query = db.table(modelName);
  }
  //-----------------------------------------------------------------------------
  /**
   * Insere um registro do Banco
   * @param Model Modelo
   */
  async put(Model: Object, verifydupe: boolean = true) {
    return await this._put(Model, verifydupe);
  }
  /**
   * Retorna um registro do Banco
   * @param id Id do registro
   */
  async get(id: number) {
    return await this._get(id);
  }
  /**
   * Apaga um registro do Banco
   * @param id Id do Registro
   */
  async delete(id: number) {
    return await this._delete(id);
  }
  /**
   *
   * @param id Id do registro
   * @param Model Modelo
   */
  async update(id: number, Model: Object) {
    return await this._update(id, Model);
  }

  /**
   * Limpa os registros do model
   */
  async clear() {
    return await this._clear();
  }

  /**
   * Insere vários registros no banco de forma otimizada
   * @param Model Lista de Objetos
   */
  async bulkPut(Model: Object[]) {
    return await this._bulkPut(Model);
  }

  //---------------------------------------------------------------------------

  async _put(Model: Object, verifydupe: boolean = true) {
    const verify = verifydupe
      ? await this.query.where(Model).first((data: Object) => data)
      : false;
    if (verify) return;
    else {
      const id = await db.table(this.modelName).put(Model);
      mutate(`${this.modelName}\\${id}`, Model);
      const retorno = await db.table(this.modelName).get(id);
      return retorno;
    }
  }

  async _get(id: number) {
    return await db.table(this.modelName).get(id);
  }

  async _delete(id: number) {
    return await db.table(this.modelName).delete(id);
  }

  async _update(id: number, Model: Object) {
    const retorno = await db.table(this.modelName).update(id, Model);
    mutate(`${this.modelName}\\${id}`, Model);
    return retorno;
  }

  async _clear() {
    return await db.table(this.modelName).clear();
  }

  async _bulkPut(models: Object[]) {
    return await db.table(this.modelName).bulkPut(models);
  }
}
