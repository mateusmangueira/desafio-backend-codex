import { Router } from 'express'; //Router serve para rotear por via do Express qual rota sera chamada, assim facilitando a nossa vida.

import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import TaskController from './controllers/TaskController'

import authMiddleware from './middlewares/auth'; //Middleware para autenticacao

const routes = new Router(); // Criando o roteador e associando a uma constante para manipular

//Criar rotas POST,GET,PUT ou DELETE a partir daqui. de acordo com o que precisa na aplicacao. Vou deixar 1 rota GET para testar o Server
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

//A partir daqui precisa controlar o acesso as rotas por meio de um middleware de autenticacao.

routes.use(authMiddleware); // Daqui pra baixo so acessa as rotas quando estiver autenticado, ou seja, ter um TOKEN JWT.

routes.get('/tasks', TaskController.index);

export default routes;