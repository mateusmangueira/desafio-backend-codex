import Task from '../models/Task';

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

  async getAllTasks(req, res) {
    try {
      let query = Task.find();

      // 1) Field limiting
      query = query.select('-__v');

      let tasks = await query;

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
      const updateTask = await Task.findByIdAndUpdate(req.params.id,
      req.body, {
          new: true,
          runValidators: true
      })
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
      await Task.findByIdAndDelete(req.params.id);
      res.status(204).json({
          status: 'success',
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