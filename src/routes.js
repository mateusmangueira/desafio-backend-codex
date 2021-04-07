import { Router } from 'express'; //Router serve para rotear por via do Express qual rota sera chamada, assim facilitando a nossa vida.

import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import TaskController from './controllers/TaskController'

import authMiddleware from './middlewares/auth';

const routes = new Router(); 

// Users
routes.post('/users', UserController.store);

routes.post('/users', UserController.store); 
routes.get('/users', UserController.index); 
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

// Tasks
routes.post('/tasks', TaskController.createTask);
routes.get('/tasks', TaskController.getAllTasks);
// routes.get('/tasks/sort', TaskController.aliasSortByPriority, TaskController.getAllTasks);
routes.put('/tasks/:id', TaskController.updateTask); //nesse caso seria rota do tipo put, pois vai alterar apenas uma especifica task.
routes.delete('/tasks/:id', TaskController.deleteTask);

export default routes;