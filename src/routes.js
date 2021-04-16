import { Router } from 'express';

import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import TaskController from './controllers/TaskController'

import authMiddleware from './middlewares/auth';
import AppError from './utils/appError'
import globalErrorHandler from './controllers/ErrorController'

const routes = new Router(); 

// Users
routes.post('/users', UserController.store);
routes.get('/users', UserController.index);

//Sessions
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.use((req, res, next) => {
    req.body.user = req.userId;
    next();
});

//LogOut
routes.post('/logout', SessionController.logout);

// Tasks
routes.post('/tasks',TaskController.createTask);
routes.get('/tasks', TaskController.getUserTasks);
routes.get('/tasks/sort', TaskController.aliasSortByPriority, TaskController.getUserTasks);
routes.put('/tasks/:id', TaskController.updateTask);
routes.delete('/tasks/:id', TaskController.deleteTask);

//Rota Genêrica
routes.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`), 404);
});

routes.use(globalErrorHandler);

export default routes;