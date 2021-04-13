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
            message: err
        });
    }
  }

  async aliasSortByPriority(req, res, next) {
    req.query.sort = 'priority,name';
    next();
  }

  async getAllTasks(req, res) {
    try {

      // Verificar esse trecho de codigo para dar o sorting
      if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
      }
      
      const user = await User.findById(req.body.user).populate({ path: 'tasks', select: '-__v' })
      const tasks = user.tasks;

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
            message: err
        });
    }
  }

  async updateTask(req, res) {
    try{
      if(req.body.priority) {
        return res.status(400).json({
          status: 'fail',
          message: "Priority can't change"
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
          message: "ID not find"
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
            message: err
        });
    }
  }
}

export default new TaskController();