import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const user = await User.create(req.body);

<<<<<<< HEAD
        return res.status(400).send({ error: 'User already exists'});

      const user = await User.create({email, name, password, isAuthenticated: true});
=======
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
>>>>>>> b7c3f4e4186c56311fdde44a687ac5146cce0bfd

  async index(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (error) {
      return res.status(400).send({error: "There are no Users"})
    }
  }

  async index(req, res) {
    const users = await User.find();
    return res.json(users);
  }
}

export default new UserController();