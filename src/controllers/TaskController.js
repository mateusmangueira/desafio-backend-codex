import Task from '../models/Task';
import User from '../models/User';

class TaskController {
  async createTask(req, res) {
    try {
      const newTask = await Task.create(req.body);

      res.status(201).json({
          status: 'sucess',
          data: {
              task: newTask
          }
      });
    } catch (err) {
        res.status(400).json({
           status: 'fail',
            message: 'Fail to creat new Task'
        });
    }
  };

  async aliasSortByPriority(req, res, next) {
    req.query.sort = true; // Apenas como referência
    next();
  }

  async getAllTasks(req, res) {
    try {
      const user = await User.findById(req.body.user).populate({ path: 'tasks', select: '-__v' });
      let userTasks = user.tasks;

      if (req.query.sort) {
        userTasks = userTasks.sort();
      }

      let tasks = await userTasks;

      res.status(200).json({
          status: 'sucess',
          results: tasks.length,
          data: {
              tasks
          }
      });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'There are no Tasks'
        });
    }
  };

  async updateTask(req, res) {
    try{
      if(req.body.priority) {
        return res.status(400).json({
          status: 'fail',
          message: "Priority cannot change"
        });
      }

      const task = await Task.findById(req.params.id);

      if (task.user != req.body.user) {
        return res.status(400).json({
          status: 'fail',
          message: "User does not have access to this task!"
        });
      }

      const updateTask = await Task.findByIdAndUpdate(req.params.id,
      req.body, {
          new: true,
          runValidators: true
      });
      
      if(!updateTask) {
        return res.status(400).json({
          status: 'fail',
          message: "ID not found"
        });
      }

      res.status(200).json({
          status: 'success',
          data: {
              task: updateTask
          }
      });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Task not found'
        });
    }
  };

  async deleteTask(req, res) {
    try {
      const task = await Task.findById(req.params.id);
      
      if (task.user != req.body.user) {
        return res.status(400).json({
          status: 'fail',
          message: "User does not have access to this task!"
        });
      }

      await Task.findByIdAndDelete(req.params.id);
      res.status(204).json({
          status: 'success',
          message: 'Task deleted',
          data: null
      });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: "Fail to delete Task"
        });
    }
  }
};

export default new TaskController();