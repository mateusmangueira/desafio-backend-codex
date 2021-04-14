import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const user = await User.create(req.body);

      res.status(201).json({
        status: 'sucess',
        data: {
          user
        }
    });
    } catch (error) {
      return res.status(400).send({
        status: 'fail',
        message: error.message
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (error) {
      return res.status(400).send({error: "There are no Users"})
    }
  }
}

export default new UserController();