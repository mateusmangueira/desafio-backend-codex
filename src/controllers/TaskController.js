import Task from '../models/Task';

class TaskController {
  async store(req, res) {
  }

  async update(req, res) {
  }

  async delete(req, res) {
  }

  async index(req, res) {
    return res.send({'ok': true, user: req.userId}); //Teste para saber se ta autenticando com o JWT, esta sim ;)
  }
}

export default new TaskController();