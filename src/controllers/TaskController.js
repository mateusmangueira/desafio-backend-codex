import Task from '../models/Task';
import User from '../models/User';
import blackList from './../utils/blackList'

class TaskController {
  async createTask(req, res) {
    try {
      const newTask = await Task.create(req.body);

      res.status(201).json({//tudo certo
          status: 'sucess',
          data: {
            task: newTask
          }
      });
    } catch (err) {//tudo certo
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
  }

  async aliasSortByPriority(req, res, next) {//nao precisa fazer
    req.query.sort = true;
    next();
  }

  async getUserTasks(req, res) {
    try {
      const user = await User.findById(req.body.user).populate({ path: 'tasks', select: '-__v' });
      let userTasks = user.tasks;

      if (req.query.sort) {//nao precisa fazer
        userTasks = userTasks.sort();
      }

      let tasks = await userTasks;

      res.status(200).json({//tudo certo
          status: 'sucess',
          results: tasks.length,
          data: {
              tasks,
          }
      });
    } catch (err) {
        res.status(404).json({//nao sei fazer nem klebin
            status: 'fail',
            message: err
        });
    }
  }

  async updateTask(req, res) {
    try{
      if(req.body.priority) {//tudo certo
        return res.status(400).json({
          status: 'fail',
          message: "Priority cannot change"
        });
      }

      const task = await Task.findById(req.params.id);

      if (task.user != req.body.user) {//nao sei fazer
        return res.status(400).json({
          status: 'fail',
          message: "User does not have access to this task!"
        });
      }

      const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true
      });
      
      if(!updateTask) {//tbm nao sei fazer sou burro
        return res.status(400).json({
          status: 'fail',
          message: 'ID not found'
        });
      }

      res.status(200).json({//teste ok
          status: 'success',
          data: {
              task: updateTask
          }
      });
    } catch (err) {//nao sei fazer nem klebin tbm
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
  }

  async deleteTask(req, res) {
    try {
      const task = await Task.findById(req.params.id);
      
      if (task.user != req.body.user) {
        return res.status(400).json({
          status: 'fail',
          message: 'User does not have access to this task!'
        });
      }

      await Task.findByIdAndDelete(req.params.id);
      res.status(204).json({
          status: 'success',
          message: 'Task deleted',
          data: null
      });
    } catch (err) {
        res.status(404).json({//nao sei fazer tbm sou burro
            status: 'fail',
            message: err
        });
    }
  }
}

export default new TaskController();