import {
  // Login
  Home_Page, Recebimentos_Page, Contas_Page
} from './views';

// const Config = [
//   {
//     path: '/cadastro/acessos',
//     name: 'Grupo de Permissão',
//     component: List_Acessos,
//     form: Form_Acessos,
//     layout: '/internal',
//   },
// ];

const Routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Home_Page,
    layout: '/in',
  },
  {
    path: '/recebimentos',
    name: 'Recebimentos',
    component: Recebimentos_Page,
    layout: '/in',
  },
  {
    path: '/contas',
    name: 'Contas',
    component: Contas_Page,
    layout: '/in',
  },
  // {
  //   collapse: true,
  //   name: 'Configurações',
  //   state: 'configCollapse',
  //   views: Config,
  // },
];

export default Routes;
