import useSWR, { mutate } from 'swr';
import api from './api';

export default class Main {
  namespace: string = '';
  response: any;
  /**
   *
   * @param namespace String para identificar o modelo
   */
  constructor(namespace: string) {
    this.namespace = namespace;
  }

  save = async (body: any) => {
    body.id
      ? (this.response = await api().put(
          `/${this.namespace}/${body.id}/`,
          body
        ))
      : (this.response = await api().post(`/${this.namespace}/`, body));
    if (this.response.status === 201 || this.response.status == 200)
      return true;
    return false;
  };

  get = async (id: number, params: Object = {}) => {
    const produtos = await api().get(
      id ? `/${this.namespace}/${id}/` : `/${this.namespace}/`,
      {
        params,
      }
    );
    if (produtos) {
      return produtos.data;
    } else {
      return null;
    }
  };

  delete = async (id: number) => {
    api()
      .delete(`/${this.namespace}/${id}/`)
      .then(() => {
        this.refreshModel();
        return true;
      });
  };

  useModel(queryParms?: string) {
    return useSWR<any, any>(
      queryParms ? `${this.namespace}?${queryParms}` : this.namespace,
      async () => {
        if (!queryParms) queryParms = '';
        const res = await api().get(`/${this.namespace}/?${queryParms}`);
        return res.data;
      }
    );
  }

  refreshModel(forceurl?: string) {
    return mutate(forceurl || this.namespace, false);
  }
}
