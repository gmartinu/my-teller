import {
  // Login
  Login_Page,
  Home_Page
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
    norender: true,
    path: '/login',
    name: 'Login',
    component: Login_Page,
    layout: '/auth',
  },
  {
    path: '/',
    name: 'Início',
    component: Home_Page,
    layout: '/internal',
  },
  // {
  //   collapse: true,
  //   name: 'Configurações',
  //   state: 'configCollapse',
  //   views: Config,
  // },
];

export default Routes;
